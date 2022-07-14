import { IFilter } from '../../type/IFilter';
import { IProduct } from '../../type/productList';
import { snapSlider } from '../../../src/index';

export class RangeQuantityFilter implements IFilter {
    rangeQuantity = new RangeQuantity();
    filtered(productList: Array<IProduct>): Array<IProduct> {
        let key: number;
        const filteredProductList = [];
        for (key = 0; key < productList.length; key++) {
            if (
                productList[key].quantity >= this.rangeQuantity.min &&
                productList[key].quantity <= this.rangeQuantity.max
            ) {
                filteredProductList.push(productList[key]);
            }
        }

        return filteredProductList;
    }

    resetToDefault(): void {
        this.rangeQuantity = new RangeQuantity();
        (snapSlider as HTMLElement).noUiSlider.set(['1', '20']);
    }
}

class RangeQuantity {
    min = 1;
    max = 20;
}
