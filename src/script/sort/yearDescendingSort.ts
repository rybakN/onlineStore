import { ISort } from '../../type/ISort';
import { IProduct } from '../../type/productList';

export class YearDescendingSort implements ISort {
    static sortName = 'yearDescendingSort';
    sort(productList: Array<IProduct>): Array<IProduct> {
        return productList.sort(this.compare);
    }

    private compare(a: IProduct, b: IProduct): number {
        if (a['startYear'] > b['startYear']) return -1;
        else return 1;
    }
}
