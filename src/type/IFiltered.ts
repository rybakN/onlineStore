import { IView } from './IView';
import { IProduct } from './productList';

export interface IFiltered {
    addFiltersEventListener: (view: IView, productList: Array<IProduct>) => void;
}
