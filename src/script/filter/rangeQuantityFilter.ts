import { IFilter } from '../../type/IFilter';
import { IProduct } from '../../type/productList';
import { snapSlider } from '../../../src/index';
import { target } from 'nouislider';

export class RangeQuantityFilter implements IFilter {
    rangeQuantity: Map<string, number> = new Map();
    constructor() {
        this.rangeQuantity.set('minQuant', 1);
        this.rangeQuantity.set('maxQuant', 20);
    }
    filtered(productList: Array<IProduct>): Array<IProduct> {
        let key: number;
        const filteredProductList = [];
        for (key = 0; key < productList.length; key++) {
            if (
                productList[key].quantity >= <number>this.rangeQuantity.get('minQuant') &&
                productList[key].quantity <= <number>this.rangeQuantity.get('maxQuant')
            ) {
                filteredProductList.push(productList[key]);
            }
        }

        return filteredProductList;
    }

    resetToDefault(): void {
        this.rangeQuantity.set('minQuant', 1);
        this.rangeQuantity.set('maxQuant', 20);
        (snapSlider as target).noUiSlider?.set(['1', '20']);
        this.saveToLocalStorage();
    }

    addFilterEventListener(additionalHandler: () => void): void {
        const quantitySlider = document.querySelector('#slider-snap');
        quantitySlider?.addEventListener('click', () => {
            this.rangeQuantity.set(
                'minQuant',
                Number((document.getElementById('slider-snap-value-lower') as Element).textContent)
            );
            this.rangeQuantity.set(
                'maxQuant',
                Number((document.getElementById('slider-snap-value-upper') as Element).textContent)
            );
            additionalHandler();
            this.saveToLocalStorage();
        });
    }

    getOptionsFromLocalStorage(productList: Array<IProduct>): Array<IProduct> {
        if (localStorage.getItem('minQuant') === null) {
            this.rangeQuantity.set('minQuant', 1);
            this.rangeQuantity.set('maxQuant', 20);
        } else {
            this.rangeQuantity.set('minQuant', JSON.parse(localStorage.getItem('minQuant') as string));
            this.rangeQuantity.set('maxQuant', JSON.parse(localStorage.getItem('maxQuant') as string));
            (snapSlider as target).noUiSlider?.set([
                <number>this.rangeQuantity.get('minQuant'),
                <number>this.rangeQuantity.get('maxQuant'),
            ]);
        }
        const filteredProductList: Array<IProduct> = this.filtered(productList);
        return filteredProductList;
    }

    private saveToLocalStorage(): void {
        for (const key of this.rangeQuantity.keys()) {
            localStorage.setItem(key, JSON.stringify(this.rangeQuantity.get(key)));
        }
    }
}
