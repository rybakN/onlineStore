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
const select = document.querySelector('.sort__select');

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
    filtered(filters: Array<IFilter>, productList: Array<IProduct>): Array<IProduct> {
        filters.forEach((filter) => {
            productList = filter.filtered(productList);
        });
        return productList;
    }

    resetToDefault(view: IView, productList: Array<IProduct>): void {
        (document.querySelector('.reset') as HTMLElement).addEventListener('click', () => {
            this.arrayFilters.forEach((filter) => {
                filter.resetToDefault();
            });
            const sortName = (select as HTMLElement).value;
            const sort = this.sorts.get(sortName);
            sort?.sort(productList);
            view.drawCard(productList);
            document.querySelectorAll('.active').forEach((elem) => {
                elem.classList.remove('active');
            });
        });
    }

    addFiltersEventListener(view: IView, productList: Array<IProduct>): void {
        this.arrayFilters.forEach((filter) => {
            filter.addFilterEventListener(() => {
                const filteredProductList = this.filter(productList);
                view.drawCard(filteredProductList);
            });
        });

        (select as HTMLElement).addEventListener('change', () => {
            const sortName = (select as Element).value;
            const sort = this.sorts.get(sortName);
            const filteredProductList = this.filter(productList);
            sort?.sort(filteredProductList);
            view.drawCard(filteredProductList);
        });
    }

    private filter(productList: Array<IProduct>): Array<IProduct> {
        this.arrayFilters.forEach((filter) => {
            productList = filter.filtered(productList);
        });
        return productList;
    }
}
