import { ISearch } from './ISearch';
import { IProduct } from './productList';

export interface ISearchTool {
    search: (search: ISearch, productList: Array<IProduct>) => Array<IProduct>;
}
