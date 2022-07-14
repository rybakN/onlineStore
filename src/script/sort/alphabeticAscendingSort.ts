import { ISort } from '../../type/ISort';
import { IProduct } from '../../type/productList';

export class AlphabeticAscendingSort implements ISort {
    static sortName = 'alphabeticDescendingSort';
    sort(productList: Array<IProduct>): Array<IProduct> {
        return productList.sort(this.compare);
    }

    private compare(a: IProduct, b: IProduct): number {
        if (a['name'] > b['name']) return -1;
        else return 1;
    }
}
