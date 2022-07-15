import { IFilter } from '../../type/IFilter';
import { IProduct } from '../../type/productList';
import { nonLinearStepSlider } from '../../../src/index';

export class RangeYearsFilter implements IFilter {
    rangeYears: Map<string, number> = new Map();
    constructor() {
        this.rangeYears.set('min', 2000);
        this.rangeYears.set('max', 2022);
    }
    filtered(productList: Array<IProduct>): Array<IProduct> {
        let key: number;
        const filteredProductList = [];
        for (key = 0; key < productList.length; key++) {
            if (
                productList[key].startYear >= <number>this.rangeYears.get('min') &&
                productList[key].startYear <= <number>this.rangeYears.get('max')
            ) {
                filteredProductList.push(productList[key]);
            }
        }

        return filteredProductList;
    }

    resetToDefault(): void {
        this.rangeYears.set('min', 2000);
        this.rangeYears.set('max', 2022);
        (nonLinearStepSlider as HTMLElement).noUiSlider.set(['2000', '2022']);
    }

    addFilterEventListener(additionalHandler: () => void): void {
        const yearSlider = document.querySelector('.noUi-target');
        yearSlider?.addEventListener('click', () => {
            this.rangeYears.set('max', Number((document.querySelector('.noUi-handle-lower') as Element).ariaValueMax));
            this.rangeYears.set('min', Number((document.querySelector('.noUi-handle-upper') as Element).ariaValueMin));
            additionalHandler();
        });
    }
}
