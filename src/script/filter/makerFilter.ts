import { IFilter } from '../../type/IFilter';
import { IProduct } from '../../type/productList';

export class MakerFilter implements IFilter {
    maker = new Maker();
    filtered(productList: Array<IProduct>): Array<IProduct> {
        let key: number;
        const filteredProductList = [];
        const trueMaker: string[] = this.makerArrayMaker(this.maker);
        if (trueMaker.length === 0) return productList;
        for (key = 0; key < productList.length; key++) {
            if (trueMaker.includes(productList[key].maker)) {
                filteredProductList.push(productList[key]);
            }
        }

        return filteredProductList;
    }

    resetToDefault(): void {
        this.maker = new Maker();
    }

    private makerArrayMaker(maker: Maker) {
        const makerFiltered: Array<string> = [];
        for (const key in maker) {
            if (maker[key] === true) {
                makerFiltered.push(key);
            }
        }
        return makerFiltered;
    }
}

class Maker {
    xiaomi = false;
    samsung = false;
    apple = false;
}
