import { IFilter } from '../../type/IFilter';
import { IProduct } from '../../type/productList';

export class CamFilter implements IFilter {
    cam: Map<string, boolean>;
    constructor() {
        this.cam = new Map();
        this.cam.set('cam1', false);
        this.cam.set('cam2', false);
        this.cam.set('cam3', false);
    }
    filtered(productList: Array<IProduct>): Array<IProduct> {
        let key: number;
        const filteredProductList = [];
        const trueCam: string[] = this.camArrayMaker(this.cam);
        if (trueCam.length === 0) return productList;
        for (key = 0; key < productList.length; key++) {
            if (trueCam.includes(productList[key].camQuant)) {
                filteredProductList.push(productList[key]);
            }
        }

        return filteredProductList;
    }
    resetToDefault(): void {
        for (const key of this.cam.keys()) {
            this.cam.set(key, false);
        }
    }

    private camArrayMaker(cam: Map<string, boolean>) {
        const camFiltered: Array<string> = [];
        cam.forEach((value, key) => {
            if (value === true) {
                camFiltered.push(key.slice(-1));
            }
        });
        return camFiltered;
    }
}
