import { IFilter } from '../../type/IFilter';
import { IProduct } from '../../type/productList';
import { nonLinearStepSlider } from '../../../src/index';
import { target } from 'nouislider';

export class RangeYearsFilter implements IFilter {
    rangeYears: Map<string, number> = new Map();
    constructor() {
        this.rangeYears.set('minYear', 2000);
        this.rangeYears.set('maxYear', 2022);
    }
    filtered(productList: Array<IProduct>): Array<IProduct> {
        let key: number;
        const filteredProductList = [];
        for (key = 0; key < productList.length; key++) {
            if (
                productList[key].startYear >= <number>this.rangeYears.get('minYear') &&
                productList[key].startYear <= <number>this.rangeYears.get('maxYear')
            ) {
                filteredProductList.push(productList[key]);
            }
        }

        return filteredProductList;
    }

    resetToDefault(): void {
        this.rangeYears.set('minYear', 2000);
        this.rangeYears.set('maxYear', 2022);
        (nonLinearStepSlider as target).noUiSlider?.set(['2000', '2022']);
        this.saveToLocalStorage();
    }

    addFilterEventListener(additionalHandler: () => void): void {
        const yearSlider = document.querySelector('.noUi-target');
        yearSlider?.addEventListener('click', () => {
            this.rangeYears.set(
                'maxYear',
                Number((document.querySelector('.noUi-handle-lower') as Element).ariaValueMax)
            );
            this.rangeYears.set(
                'minYear',
                Number((document.querySelector('.noUi-handle-upper') as Element).ariaValueMin)
            );
            additionalHandler();
            this.saveToLocalStorage();
        });
    }

    getOptionsFromLocalStorage(productList: Array<IProduct>): Array<IProduct> {
        if (localStorage.getItem('minYear') === null) {
            this.rangeYears.set('minYear', 2000);
            this.rangeYears.set('maxYear', 2022);
        } else {
            this.rangeYears.set('minYear', JSON.parse(localStorage.getItem('minYear') as string));
            this.rangeYears.set('maxYear', JSON.parse(localStorage.getItem('maxYear') as string));
            (nonLinearStepSlider as target).noUiSlider?.set([
                <number>this.rangeYears.get('minYear'),
                <number>this.rangeYears.get('maxYear'),
            ]);
        }
        const filteredProductList: Array<IProduct> = this.filtered(productList);
        return filteredProductList;
    }

    private saveToLocalStorage(): void {
        for (const key of this.rangeYears.keys()) {
            localStorage.setItem(key, JSON.stringify(this.rangeYears.get(key)));
        }
    }
}
