import { ILoader } from '../type/ILoader';
import { IProduct } from '../type/productList';

export class Loader implements ILoader {
    getProducts(): Array<IProduct> {
        return [
            {
                name: 'Apple iphone 11',
                urlImg: '../src/img/product/apple_iphone_11_pro.jpg',
                quantity: 20,
                startYear: 2020,
                maker: 'apple',
                color: 'green',
                camQuant: '2',
                popular: true,
            },
            {
                name: 'Samsung',
                urlImg: '../src/img/product/apple_iphone_11_pro.jpg',
                quantity: 1,
                startYear: 2021,
                maker: 'samsung',
                color: 'red',
                camQuant: '1',
                popular: true,
            },
            {
                name: 'Xiaomi',
                urlImg: '../src/img/product/apple_iphone_11_pro.jpg',
                quantity: 8,
                startYear: 2019,
                maker: 'xiaomi',
                color: 'black',
                camQuant: '3',
                popular: true,
            },
            {
                name: 'Apple iphone 11',
                urlImg: '../src/img/product/apple_iphone_11_pro.jpg',
                quantity: 7,
                startYear: 2010,
                maker: 'apple',
                color: 'green',
                camQuant: '2',
                popular: false,
            },
            {
                name: 'Apple iphone 11',
                urlImg: '../src/img/product/apple_iphone_11_pro.jpg',
                quantity: 6,
                startYear: 2000,
                maker: 'apple',
                color: 'red',
                camQuant: '1',
                popular: true,
            },
            {
                name: 'Apple iphone 11',
                urlImg: '../src/img/product/apple_iphone_11_pro.jpg',
                quantity: 5,
                startYear: 2015,
                maker: 'apple',
                color: 'black',
                camQuant: '3',
                popular: false,
            },
        ];
    }
}

// export class JsonLoader implements ILoader {
//     getProducts(): Array<IProduct> {
//         async getProductsFromJson () {
//         let response = await fetch(urlProduct);
//         let productList = await response.json();
//         return productList;
//     }
//     }
// }