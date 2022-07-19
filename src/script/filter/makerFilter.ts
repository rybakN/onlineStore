import { IFilter } from '../../type/IFilter';
import { IProduct } from '../../type/productList';

export class MakerFilter implements IFilter {
    maker: Map<string, boolean>;
    constructor() {
        this.maker = new Map();
        this.maker.set('xiaomi', false);
        this.maker.set('samsung', false);
        this.maker.set('apple', false);
    }
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
        for (const key of this.maker.keys()) {
            this.maker.set(key, false);
        }
        this.saveToLocalStorage();
    }

    addFilterEventListener(additionalHandler: () => void): void {
        document.querySelectorAll('.maker__btn').forEach((label) =>
            label.addEventListener('click', () => {
                if ((label as HTMLElement).classList.contains('active')) {
                    (label as HTMLElement).classList.remove('active');
                    for (const key of this.maker.keys()) {
                        if (label.classList.contains(key)) this.maker.set(key, false);
                    }
                } else {
                    (label as HTMLElement).classList.add('active');
                    for (const key of this.maker.keys()) {
                        if (label.classList.contains(key)) this.maker.set(key, true);
                    }
                }
                additionalHandler();
                this.saveToLocalStorage();
            })
        );
    }

    getOptionsFromLocalStorage(productList: Array<IProduct>): Array<IProduct> {
        for (const key of this.maker.keys()) {
            if (localStorage.getItem(key) === null) {
                this.maker.set(key, false);
            } else {
                this.maker.set(key, JSON.parse(localStorage.getItem(key) as string));
                if (JSON.parse(localStorage.getItem(key) as string) === true) {
                    document.querySelector('.' + key)?.classList.add('active');
                }
            }
        }
        const filteredProductList: Array<IProduct> = this.filtered(productList);
        return filteredProductList;
    }

    private makerArrayMaker(maker: Map<string, boolean>) {
        const makerFiltered: Array<string> = [];
        maker.forEach((value, key) => {
            if (value === true) {
                makerFiltered.push(key);
            }
        });
        return makerFiltered;
    }

    private saveToLocalStorage(): void {
        for (const key of this.maker.keys()) {
            localStorage.setItem(key, JSON.stringify(this.maker.get(key)));
        }
    }
}
