import { IProduct } from './productList';

export interface ISort {
    sort: (productList: Array<IProduct>) => Array<IProduct>;
}
