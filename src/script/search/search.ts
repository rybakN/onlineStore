import { IFilter } from '../../type/IFilter';
import { IProduct } from '../../type/productList';

export class SearchTool implements IFilter {
    // search = new Search();
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
    }

    addFilterEventListener(additionalHandler: () => void): void {
        const searchField = document.querySelector('.search-input');
        (searchField as HTMLElement).addEventListener('keyup', () => {
            this.search.set('value', (searchField as Element).value);
            additionalHandler();
        });
    }
}
