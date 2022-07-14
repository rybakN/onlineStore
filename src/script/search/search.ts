import { IFilter } from '../../type/IFilter';
import { IProduct } from '../../type/productList';

export class SearchTool implements IFilter {
    search = new Search();
    filtered(productList: Array<IProduct>): Array<IProduct> {
        const searchedProductList: Array<IProduct> = [];
        productList.forEach((item) => {
            if (item.name.toLocaleLowerCase().indexOf(this.search.value.toLocaleLowerCase()) > -1) {
                searchedProductList.push(item);
            }
        });
        return searchedProductList;
    }

    resetToDefault(): void {
        this.search = new Search();
    }
}

class Search {
    value = '';
}
