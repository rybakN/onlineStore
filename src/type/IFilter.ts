import { IProduct } from './productList';

export interface IFilter {
    filtered: (productList: Array<IProduct>) => Array<IProduct>;
    resetToDefault: () => void;
    addFilterEventListener: (additionalHandler: () => void) => void;
    getOptionsFromLocalStorage: (productList: Array<IProduct>) => Array<IProduct>;
}
