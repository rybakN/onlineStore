import { IFilter } from '../../type/IFilter';
import { IProduct } from '../../type/productList';

export class ColorFilter implements IFilter {
    color: Map<string, boolean>;
    constructor() {
        this.color = new Map();
        this.color.set('red', false);
        this.color.set('black', false);
        this.color.set('green', false);
    }
    filtered(productList: Array<IProduct>): Array<IProduct> {
        let key: number;
        const filteredProductList = [];
        const trueColor: string[] = this.colorArrayMaker(this.color);
        if (trueColor.length === 0) return productList;
        for (key = 0; key < productList.length; key++) {
            if (trueColor.includes(productList[key].color)) {
                filteredProductList.push(productList[key]);
            }
        }

        return filteredProductList;
    }

    resetToDefault(): void {
        for (const key of this.color.keys()) {
            this.color.set(key, false);
        }
        this.saveToLocalStorage();
    }

    addFilterEventListener(additionalHandler: () => void): void {
        document.querySelectorAll('.color__btn').forEach((label) =>
            label.addEventListener('click', () => {
                if ((label as HTMLElement).classList.contains('active')) {
                    (label as HTMLElement).classList.remove('active');
                    for (const key of this.color.keys()) {
                        if (label.classList.contains(key)) this.color.set(key, false);
                    }
                } else {
                    (label as HTMLElement).classList.add('active');
                    for (const key of this.color.keys()) {
                        if (label.classList.contains(key)) this.color.set(key, true);
                    }
                }
                additionalHandler();
                this.saveToLocalStorage();
            })
        );
    }

    getOptionsFromLocalStorage(productList: Array<IProduct>): Array<IProduct> {
        for (const key of this.color.keys()) {
            if (localStorage.getItem(key) != null) {
                this.color.set(key, JSON.parse(localStorage.getItem(key) as string));
                if (JSON.parse(localStorage.getItem(key) as string) === true) {
                    document.querySelector('.' + key)?.classList.add('active');
                }
            }
        }
        const filteredProductList: Array<IProduct> = this.filtered(productList);
        return filteredProductList;
    }

    private colorArrayMaker(color: Map<string, boolean>) {
        const colorFiltered: Array<string> = [];
        color.forEach((value, key) => {
            if (value == true) {
                colorFiltered.push(key);
            }
        });
        return colorFiltered;
    }

    private saveToLocalStorage(): void {
        for (const key of this.color.keys()) {
            localStorage.setItem(key, JSON.stringify(this.color.get(key)));
        }
    }
}
