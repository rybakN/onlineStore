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
        this.saveToLocalStorage();
    }

    addFilterEventListener(additionalHandler: () => void): void {
        document.querySelectorAll('.cam__btn').forEach((label) =>
            label.addEventListener('click', () => {
                if ((label as HTMLElement).classList.contains('active')) {
                    (label as HTMLElement).classList.remove('active');
                    for (const key of this.cam.keys()) {
                        if (label.classList.contains(key)) this.cam.set(key, false);
                    }
                } else {
                    (label as HTMLElement).classList.add('active');
                    for (const key of this.cam.keys()) {
                        if (label.classList.contains(key)) this.cam.set(key, true);
                    }
                }
                this.saveToLocalStorage();
                additionalHandler();
            })
        );
    }

    getOptionsFromLocalStorage(productList: Array<IProduct>): Array<IProduct> {
        for (const key of this.cam.keys()) {
            if (localStorage.getItem(key) === null) {
                this.cam.set(key, false);
            } else {
                this.cam.set(key, JSON.parse(localStorage.getItem(key) as string));
                if (JSON.parse(localStorage.getItem(key) as string) === true) {
                    document.querySelector('.' + key)?.classList.add('active');
                }
            }
        }
        const filteredProductList: Array<IProduct> = this.filtered(productList);
        return filteredProductList;
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

    private saveToLocalStorage(): void {
        for (const key of this.cam.keys()) {
            localStorage.setItem(key, JSON.stringify(this.cam.get(key)));
        }
    }
}
