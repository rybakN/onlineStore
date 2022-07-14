import { IFilter } from '../../type/IFilter';
import { IProduct } from '../../type/productList';

export class PopularFilter implements IFilter {
    popular = new Popular();
    filtered(productList: Array<IProduct>): Array<IProduct> {
        let key: number;
        const filteredProductList = [];
        if (this.popular.popular === false) return productList;
        for (key = 0; key < productList.length; key++) {
            if (productList[key].popular) {
                filteredProductList.push(productList[key]);
            }
        }

        return filteredProductList;
    }

    resetToDefault(): void {
        this.popular = new Popular();
    }
}

class Popular {
    popular = false;
}
