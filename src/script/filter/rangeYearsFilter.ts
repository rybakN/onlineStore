import { IFilter } from '../../type/IFilter';
import { IProduct } from '../../type/productList';
import { nonLinearStepSlider } from '../../../src/index';

export class RangeYearsFilter implements IFilter {
    rangeYears = new RangeYears();
    filtered(productList: Array<IProduct>): Array<IProduct> {
        let key: number;
        const filteredProductList = [];
        for (key = 0; key < productList.length; key++) {
            if (
                productList[key].startYear >= this.rangeYears.min &&
                productList[key].startYear <= this.rangeYears.max
            ) {
                filteredProductList.push(productList[key]);
            }
        }

        return filteredProductList;
    }

    resetToDefault(): void {
        this.rangeYears = new RangeYears();
        (nonLinearStepSlider as HTMLElement).noUiSlider.set(['2000', '2022']);
    }
}

class RangeYears {
    min = 2000;
    max = 2022;
}
