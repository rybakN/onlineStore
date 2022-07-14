import { IFilter } from './IFilter';
import { IProduct } from './productList';

export interface IFiltered {
    filtered: (filters: Array<IFilter>, productList: Array<IProduct>) => Array<IProduct>;
}
