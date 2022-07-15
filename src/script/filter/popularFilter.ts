import { IFilter } from '../../type/IFilter';
import { IProduct } from '../../type/productList';

export class PopularFilter implements IFilter {
    popular: Map<string, boolean>;
    constructor() {
        this.popular = new Map();
        this.popular.set('popular', false);
    }
    filtered(productList: Array<IProduct>): Array<IProduct> {
        let key: number;
        const filteredProductList = [];
        if (this.popular.get('popular') === false) {
            return productList;
        } else {
            for (key = 0; key < productList.length; key++) {
                if (productList[key].popular) {
                    filteredProductList.push(productList[key]);
                }
            }
        }

        return filteredProductList;
    }

    resetToDefault(): void {
        this.popular.set('popular', false);
    }

    addFilterEventListener(additionalHandler: () => void): void {
        document.querySelectorAll('.popular__btn').forEach((label) =>
            label.addEventListener('click', () => {
                if ((label as HTMLElement).classList.contains('active')) {
                    (label as HTMLElement).classList.remove('active');
                    for (const key of this.popular.keys()) {
                        if (label.classList.contains(key)) this.popular.set(key, false);
                    }
                } else {
                    (label as HTMLElement).classList.add('active');
                    for (const key of this.popular.keys()) {
                        if (label.classList.contains(key)) this.popular.set(key, true);
                    }
                }
                additionalHandler();
            })
        );
    }
}
