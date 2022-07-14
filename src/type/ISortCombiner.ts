import { IProduct } from './productList';

export interface ISortCombiner {
    sort: (productList: Array<IProduct>) => Array<IProduct>;
}
