import { IFilter } from './IFilter';
import { IView } from './IView';
import { IProduct } from './productList';

export interface IFiltered {
    filtered: (filters: Array<IFilter>, productList: Array<IProduct>) => Array<IProduct>;
    resetToDefault: (view: IView, productList: Array<IProduct>) => void;
}
