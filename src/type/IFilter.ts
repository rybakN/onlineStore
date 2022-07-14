import { IProduct } from './productList';

export interface IFilter {
    filtered: (productList: Array<IProduct>) => Array<IProduct>;
    resetToDefault: () => void;
}
