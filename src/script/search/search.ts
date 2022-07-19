import { IFilter } from '../../type/IFilter';
import { IProduct } from '../../type/productList';

export class SearchTool implements IFilter {
    search: Map<string, string> = new Map();
    constructor() {
        this.search.set('value', '');
    }
    filtered(productList: Array<IProduct>): Array<IProduct> {
        const searchedProductList: Array<IProduct> = [];
        productList.forEach((item) => {
            if (item.name.toLocaleLowerCase().indexOf((this.search.get('value') as string).toLocaleLowerCase()) > -1) {
                searchedProductList.push(item);
            }
        });
        return searchedProductList;
    }

    resetToDefault(): void {
        this.search.set('value', '');
        this.saveToLocalStorage();
        (document.querySelector('.search-input') as HTMLInputElement).value = '';
    }

    addFilterEventListener(additionalHandler: () => void): void {
        const searchField = document.querySelector('.search-input');
        (searchField as HTMLElement).addEventListener('keyup', () => {
            this.search.set('value', (searchField as HTMLInputElement).value);
            additionalHandler();
            this.saveToLocalStorage();
        });
    }

    getOptionsFromLocalStorage(productList: Array<IProduct>): Array<IProduct> {
        if (localStorage.getItem('value') === null) {
            this.search.set('value', '');
        } else {
            this.search.set('value', JSON.parse(localStorage.getItem('value') as string));
            (document.querySelector('.search-input') as HTMLInputElement).value = <string>this.search.get('value');
        }
        const filteredProductList: Array<IProduct> = this.filtered(productList);
        return filteredProductList;
    }

    private saveToLocalStorage(): void {
        for (const key of this.search.keys()) {
            localStorage.setItem(key, JSON.stringify(this.search.get(key)));
        }
    }
}
