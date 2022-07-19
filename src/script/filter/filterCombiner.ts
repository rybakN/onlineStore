import { IFilter } from '../../type/IFilter';
import { IFiltered } from '../../type/IFiltered';
import { ISort } from '../../type/ISort';
import { IView } from '../../type/IView';
import { IProduct } from '../../type/productList';
import { SearchTool } from '../search/search';
import { AlphabeticAscendingSort } from '../sort/alphabeticAscendingSort';
import { AlphabeticDescendingSort } from '../sort/alphabeticDescendingSort';
import { YearAccedingSort } from '../sort/yearAccedingSort';
import { YearDescendingSort } from '../sort/yearDescendingSort';
import { CamFilter } from './camFilter';
import { ColorFilter } from './colorFilter';
import { MakerFilter } from './makerFilter';
import { PopularFilter } from './popularFilter';
import { RangeQuantityFilter } from './rangeQuantityFilter';
import { RangeYearsFilter } from './rangeYearsFilter';

export class FilterCombiner implements IFiltered {
    arrayFilters: Array<IFilter> = [];
    sorts: Map<string, ISort> = new Map();
    constructor() {
        this.sorts.set(AlphabeticAscendingSort.sortName, new AlphabeticAscendingSort());
        this.sorts.set(AlphabeticDescendingSort.sortName, new AlphabeticDescendingSort());
        this.sorts.set(YearAccedingSort.sortName, new YearAccedingSort());
        this.sorts.set(YearDescendingSort.sortName, new YearDescendingSort());
        this.arrayFilters.push(new ColorFilter());
        this.arrayFilters.push(new CamFilter());
        this.arrayFilters.push(new MakerFilter());
        this.arrayFilters.push(new PopularFilter());
        this.arrayFilters.push(new RangeYearsFilter());
        this.arrayFilters.push(new RangeQuantityFilter());
        this.arrayFilters.push(new SearchTool());
    }

    addFiltersEventListener(view: IView, productList: Array<IProduct>): void {
        window.onload = () => {
            const loaded = localStorage.getItem('loaded');
            if (loaded) {
                this.loadFromLocalStorage(<IView>view, <Array<IProduct>>productList, <HTMLElement>selectedSort);
            } else {
                localStorage.setItem('loaded', 'true');
            }
        };

        const selectedSort = document.querySelector('.sort__select');
        this.arrayFilters.forEach((filter) => {
            filter.addFilterEventListener(() => {
                const filteredProductList = this.filter(productList);
                this.addSortEventListener(<IView>view, <Array<IProduct>>filteredProductList, <HTMLElement>selectedSort);
                view.drawCard(filteredProductList);
            });
        });
        this.addSortEventListener(<IView>view, <Array<IProduct>>productList, <HTMLElement>selectedSort);
        this.addResetEventListener(<IView>view, <Array<IProduct>>productList, <HTMLElement>selectedSort);
        this.addResetLocalStorageEventListener(<IView>view, <Array<IProduct>>productList);
    }

    private filter(productList: Array<IProduct>): Array<IProduct> {
        this.arrayFilters.forEach((filter) => {
            productList = filter.filtered(productList);
        });
        return productList;
    }

    private addResetEventListener(view: IView, productList: Array<IProduct>, selectedSort: HTMLElement): void {
        (document.querySelector('.reset') as HTMLElement).addEventListener('click', () => {
            this.arrayFilters.forEach((filter) => {
                filter.resetToDefault();
            });
            const sortName = (selectedSort as HTMLInputElement).value;
            const sort = this.sorts.get(sortName);
            sort?.sort(productList);
            view.drawCard(productList);
            document.querySelectorAll('.active').forEach((elem) => {
                elem.classList.remove('active');
            });
        });
    }

    private addResetLocalStorageEventListener(view: IView, productList: Array<IProduct>): void {
        (document.querySelector('.reset-LS') as HTMLElement).addEventListener('click', () => {
            localStorage.clear();
            location.reload();
            view.drawCard(productList);
            document.querySelectorAll('.active').forEach((elem) => {
                elem.classList.remove('active');
            });
        });
    }

    private addSortEventListener(view: IView, productList: Array<IProduct>, selectedSort: HTMLElement): void {
        (selectedSort as HTMLElement).addEventListener('change', () => {
            const sortName: string = (selectedSort as HTMLInputElement).value;
            const sort: ISort | undefined = this.sorts.get(sortName);
            const filteredProductList: Array<IProduct> = this.filter(productList);
            sort?.sort(filteredProductList);
            view.drawCard(filteredProductList);
        });
    }

    private getFilterLS(productList: Array<IProduct>): Array<IProduct> {
        this.arrayFilters.forEach((filter) => {
            productList = filter.getOptionsFromLocalStorage(productList);
        });
        return productList;
    }

    private loadFromLocalStorage(view: IView, productList: Array<IProduct>, selectedSort: HTMLElement): void {
        const filteredProductList = this.getFilterLS(productList);
        const sortName: string | null = localStorage.getItem('sortName');
        if (sortName != null) {
            (selectedSort as HTMLInputElement).value = sortName;
        }
        const sort = this.sorts.get(<string>sortName);
        sort?.sort(filteredProductList);
        view.drawCard(filteredProductList);
    }
}
