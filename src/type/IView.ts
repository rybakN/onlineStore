import { IProduct } from './productList';

export interface IView {
    drawCard: (productList: Array<IProduct>) => void;
}
