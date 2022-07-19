import { IView } from '../type/IView';
import { IProduct } from '../type/productList';

export class AppView implements IView {
    drawCard(productList: Array<IProduct>): void {
        let key: number;
        let card = '';
        if (productList.length === 0) {
            card += `<div class='none_product'>Sorry</div>`;
            (document.querySelector('.product') as HTMLElement).innerHTML = card;
        }
        for (key = 0; key < productList.length; key++) {
            card += `
        <div class='card'>
            <div class='card__name'>${productList[key].name}</div>
            <div class='card__img'>
                <img src='${productList[key].urlImg}' alt='phone'>
            </div>
            <ul class='card__property'>
                <li>Количество: ${productList[key].quantity}</li>
                <li>Год выхода: ${productList[key].startYear}</li>
                <li>Производитель: ${productList[key].maker}</li>
                <li>Цвет: ${productList[key].color}</li>
                <li>Количество камер: ${productList[key].camQuant}</li>
                <li>Популярность: ${productList[key].popular}</li>
            </ul>
        </div>
    
        `;
        }
        (document.querySelector('.product') as HTMLElement).innerHTML = card;
    }
}
