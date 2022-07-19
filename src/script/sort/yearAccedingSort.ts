import { ISort } from '../../type/ISort';
import { IProduct } from '../../type/productList';

export class YearAccedingSort implements ISort {
    static sortName = 'yearAccedingSort';
    sort(productList: Array<IProduct>): Array<IProduct> {
        localStorage.setItem('sortName', 'yearAccedingSort');
        return productList.sort(this.compare);
    }

    private compare(a: IProduct, b: IProduct): number {
        if (a['startYear'] < b['startYear']) return -1;
        else return 1;
    }
}
