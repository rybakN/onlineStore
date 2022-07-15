import { IApp } from '../type/IApp';
import { ILoader } from '../type/ILoader';
import { IView } from '../type/IView';
import { IProduct } from '../type/productList';
import { FilterCombiner } from './filter/filterCombiner';
import { Loader } from './loader';
import { AppView } from './view';

export class App implements IApp {
    loader: ILoader;
    view: IView;
    filterCombiner: FilterCombiner;
    constructor() {
        this.loader = new Loader();
        this.view = new AppView();
        this.filterCombiner = new FilterCombiner();
    }
    start(): void {
        const productList: Array<IProduct> = this.loader.getProducts();
        this.filterCombiner.addFiltersEventListener(this.view, productList);
        this.filterCombiner.resetToDefault(this.view, productList);

        //productList.then(data => this.view.drawCard(data));
        this.view.drawCard(productList);
    }
}
