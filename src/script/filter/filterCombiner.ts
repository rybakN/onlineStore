import { IFilter } from '../../type/IFilter';
import { IFiltered } from '../../type/IFiltered';
import { IProduct } from '../../type/productList';

export class FilterCombiner implements IFiltered {
    filtered(filters: Array<IFilter>, productList: Array<IProduct>): Array<IProduct> {
        filters.forEach((filter) => {
            productList = filter.filtered(productList);
        });
        return productList;
    }

    resetToDefault(filters: Array<IFilter>): void {
        filters.forEach((filter) => {
            filter.resetToDefault();
        });
    }
}
