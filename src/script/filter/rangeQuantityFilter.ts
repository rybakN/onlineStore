import { IFilter } from '../../type/IFilter';
import { IProduct } from '../../type/productList';
import { snapSlider } from '../../../src/index';

export class RangeQuantityFilter implements IFilter {
    rangeQuantity: Map<string, number> = new Map();
    constructor() {
        this.rangeQuantity.set('min', 1);
        this.rangeQuantity.set('max', 20);
    }
    filtered(productList: Array<IProduct>): Array<IProduct> {
        let key: number;
        const filteredProductList = [];
        for (key = 0; key < productList.length; key++) {
            if (
                productList[key].quantity >= <number>this.rangeQuantity.get('min') &&
                productList[key].quantity <= <number>this.rangeQuantity.get('max')
            ) {
                filteredProductList.push(productList[key]);
            }
        }

        return filteredProductList;
    }

    resetToDefault(): void {
        this.rangeQuantity.set('min', 1);
        this.rangeQuantity.set('max', 20);
        (snapSlider as HTMLElement).noUiSlider.set(['1', '20']);
    }

    addFilterEventListener(additionalHandler: () => void): void {
        const quantitySlider = document.querySelector('#slider-snap');
        quantitySlider?.addEventListener('click', () => {
            this.rangeQuantity.set(
                'min',
                Number((document.getElementById('slider-snap-value-lower') as Element).textContent)
            );
            this.rangeQuantity.set(
                'max',
                Number((document.getElementById('slider-snap-value-upper') as Element).textContent)
            );
            additionalHandler();
        });
    }
}
