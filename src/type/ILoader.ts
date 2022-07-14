import { IProduct } from './productList';

export interface ILoader {
    getProducts: () => Array<IProduct>;
}
