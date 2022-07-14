import { IApp } from '../type/IApp';
import { ILoader } from '../type/ILoader';
import { IView } from '../type/IView';
import { IProduct } from '../type/productList';
import { CamFilter } from './filter/camFilter';
import { ColorFilter } from './filter/colorFilter';
import { FilterCombiner } from './filter/filterCombiner';
import { Loader } from './loader';
import { MakerFilter } from './filter/makerFilter';
import { AppView } from './view';
import { SearchTool } from './search/search';
import { IFilter } from '../type/IFilter';
import { PopularFilter } from './filter/popularFilter';
import { RangeYearsFilter } from './filter/rangeYearsFilter';
import { RangeQuantityFilter } from './filter/rangeQuantityFilter';
import { ISort } from '../type/ISort';
import { AlphabeticAscendingSort } from './sort/alphabeticAscendingSort';
import { AlphabeticDescendingSort } from './sort/alphabeticDescendingSort';
import { YearAccedingSort } from './sort/yearAccedingSort';
import { YearDescendingSort } from './sort/yearDescendingSort';

export class App implements IApp {
    loader: ILoader;
    view: IView;
    filterCombiner: FilterCombiner;
    sorts: Map<string, ISort>;
    constructor() {
        this.loader = new Loader();
        this.view = new AppView();
        this.filterCombiner = new FilterCombiner();
        this.sorts = new Map();
        this.sorts.set(AlphabeticAscendingSort.sortName, new AlphabeticAscendingSort());
        this.sorts.set(AlphabeticDescendingSort.sortName, new AlphabeticDescendingSort());
        this.sorts.set(YearAccedingSort.sortName, new YearAccedingSort());
        this.sorts.set(YearDescendingSort.sortName, new YearDescendingSort());
    }
    start(): void {
        const productList: Array<IProduct> = this.loader.getProducts();
        const colorFilter = new ColorFilter();
        const camFilter = new CamFilter();
        const popularFilter = new PopularFilter();
        const makerFilter = new MakerFilter();
        const rangeYearsFilter = new RangeYearsFilter();
        const rangeQuantityFilter = new RangeQuantityFilter();
        const search = new SearchTool();

        const arrayFilters: Array<IFilter> = [
            colorFilter,
            camFilter,
            makerFilter,
            popularFilter,
            rangeYearsFilter,
            rangeQuantityFilter,
            search,
        ];

        this.addFilterButtonEventListener('.cam__btn', camFilter.cam, arrayFilters, productList);
        this.addFilterButtonEventListener('.color__btn', colorFilter.color, arrayFilters, productList);

        // document.querySelectorAll('.color__btn').forEach((label) =>
        //     label.addEventListener('click', () => {
        //         if ((label as HTMLElement).classList.contains('active')) {
        //             (label as HTMLElement).classList.remove('active');
        //             if (label.classList.contains('red')) colorFilter.color.red = false;
        //             else if (label.classList.contains('green')) colorFilter.color.green = false;
        //             else if (label.classList.contains('black')) colorFilter.color.black = false;
        //         } else {
        //             (label as HTMLElement).classList.add('active');
        //             if (label.classList.contains('red')) colorFilter.color.red = true;
        //             else if (label.classList.contains('green')) colorFilter.color.green = true;
        //             else if (label.classList.contains('black')) colorFilter.color.black = true;
        //         }
        //         const filteredProductList = this.filterCombiner.filtered(arrayFilters, productList);
        //         this.view.drawCard(filteredProductList);
        //     })
        // );

        // document.querySelectorAll('.cam__btn').forEach((label) =>
        //     label.addEventListener('click', () => {
        //         if ((label as HTMLElement).classList.contains('active')) {
        //             (label as HTMLElement).classList.remove('active');
        //             if (label.classList.contains('cam1')) camFilter.cam.cam1 = false;
        //             else if (label.classList.contains('cam2')) camFilter.cam.cam2 = false;
        //             else if (label.classList.contains('cam3')) camFilter.cam.cam3 = false;
        //         } else {
        //             (label as HTMLElement).classList.add('active');
        //             if (label.classList.contains('cam1')) camFilter.cam.cam1 = true;
        //             else if (label.classList.contains('cam2')) camFilter.cam.cam2 = true;
        //             else if (label.classList.contains('cam3')) camFilter.cam.cam3 = true;
        //         }
        //         const filteredProductList = this.filterCombiner.filtered(arrayFilters, productList);
        //         this.view.drawCard(filteredProductList);
        //     })
        // );

        document.querySelectorAll('.maker__btn').forEach((label) =>
            label.addEventListener('click', () => {
                if ((label as HTMLElement).classList.contains('active')) {
                    (label as HTMLElement).classList.remove('active');
                    if (label.classList.contains('xiaomi')) makerFilter.maker.xiaomi = false;
                    else if (label.classList.contains('samsung')) makerFilter.maker.samsung = false;
                    else if (label.classList.contains('apple')) makerFilter.maker.apple = false;
                } else {
                    (label as HTMLElement).classList.add('active');
                    if (label.classList.contains('xiaomi')) makerFilter.maker.xiaomi = true;
                    else if (label.classList.contains('samsung')) makerFilter.maker.samsung = true;
                    else if (label.classList.contains('apple')) makerFilter.maker.apple = true;
                }
                const filteredProductList = this.filterCombiner.filtered(arrayFilters, productList);
                this.view.drawCard(filteredProductList);
            })
        );

        (document.querySelector('.popular__btn') as HTMLElement).addEventListener('click', (e) => {
            if ((e.target as HTMLElement).classList.contains('active')) {
                (e.target as HTMLElement).classList.remove('active');
                popularFilter.popular.popular = false;
            } else {
                (e.target as HTMLElement).classList.add('active');
                popularFilter.popular.popular = true;
            }
            const filteredProductList = this.filterCombiner.filtered(arrayFilters, productList);
            this.view.drawCard(filteredProductList);
        });

        const yearSlider = document.querySelector('.noUi-target');
        yearSlider?.addEventListener('click', () => {
            rangeYearsFilter.rangeYears.max = Number(
                (document.querySelector('.noUi-handle-lower') as Element).ariaValueMax
            );
            rangeYearsFilter.rangeYears.min = Number(
                (document.querySelector('.noUi-handle-upper') as Element).ariaValueMin
            );
            const filteredProductList = this.filterCombiner.filtered(arrayFilters, productList);
            this.view.drawCard(filteredProductList);
        });

        const quantitySlider = document.getElementById('slider-snap');
        quantitySlider?.addEventListener('click', () => {
            rangeQuantityFilter.rangeQuantity.min = Number(
                (document.getElementById('slider-snap-value-lower') as Element).textContent
            );
            rangeQuantityFilter.rangeQuantity.max = Number(
                (document.getElementById('slider-snap-value-upper') as Element).textContent
            );
            const filteredProductList = this.filterCombiner.filtered(arrayFilters, productList);
            this.view.drawCard(filteredProductList);
        });

        const select = document.querySelector('.sort__select');
        (select as HTMLElement).addEventListener('change', () => {
            const sortName = (select as Element).value;
            const sort = this.sorts.get(sortName);
            const filteredProductList = this.filterCombiner.filtered(arrayFilters, productList);
            sort?.sort(filteredProductList);
            this.view.drawCard(filteredProductList);
        });

        const searchField = document.querySelector('.search-input');
        (searchField as HTMLElement).addEventListener('keyup', () => {
            search.search.value = (searchField as Element).value;
            const filteredProductList = this.filterCombiner.filtered(arrayFilters, productList);
            this.view.drawCard(filteredProductList);
        });

        document.querySelector('.reset')?.addEventListener('click', () => {
            this.filterCombiner.resetToDefault(arrayFilters);
            const sortName = (select as Element).value;
            const sort = this.sorts.get(sortName);
            sort?.sort(productList);
            this.view.drawCard(productList);
            document.querySelectorAll('.active').forEach((elem) => {
                elem.classList.remove('active');
            });
        });
        //productList.then(data => this.view.drawCard(data));
        this.view.drawCard(productList);
    }

    private addFilterButtonEventListener(
        filterClassName: string,
        filterValues: Map<string, boolean>,
        arrayFilters: Array<IFilter>,
        productList: Array<IProduct>
    ): void {
        document.querySelectorAll(filterClassName).forEach((label) =>
            label.addEventListener('click', () => {
                if ((label as HTMLElement).classList.contains('active')) {
                    (label as HTMLElement).classList.remove('active');
                    for (const key of filterValues.keys()) {
                        if (label.classList.contains(key)) filterValues.set(key, false);
                    }
                } else {
                    (label as HTMLElement).classList.add('active');
                    for (const key of filterValues.keys()) {
                        if (label.classList.contains(key)) filterValues.set(key, true);
                    }
                }
                const filteredProductList = this.filterCombiner.filtered(arrayFilters, productList);
                this.view.drawCard(filteredProductList);
            })
        );
    }
}
