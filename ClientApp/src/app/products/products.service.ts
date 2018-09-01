import { Product } from './products.model';

export class ProductsService {
    private products: Product[] = [
        {asin:'0000001', title:'product one',  price:10, URL:"", imageUrl:"", BSR:756, category:"kids", status:null, keywords:[{keyword:'test', amountSearched:10}] },
        {asin:'0000002', title:"product two",  price:180, URL:"", imageUrl:"", BSR:35, category:"kitchen", status:null, keywords:[{keyword:'test', amountSearched:160}] },
        {asin:'0000003', title:"product three",  price:160, URL:"", imageUrl:"", BSR:5, category:"electronics", status:null, keywords:[{keyword:'test', amountSearched:106}] },
        {asin:'0000004', title:"product four",  price:150, URL:"", imageUrl:"", BSR:10, category:"kids", status:null, keywords:[{keyword:'test', amountSearched:103}] },
        {asin:'0000005', title:"product five",  price:410, URL:"", imageUrl:"", BSR:356, category:"kitchen", status:null, keywords:[{keyword:'test', amountSearched:310}] },
        {asin:'0000006', title:"product six",  price:150, URL:"", imageUrl:"", BSR:933, category:"kids", status:null, keywords:[{keyword:'test', amountSearched:1770}] }
    ];

    getProducts () {
        // return {...this.products}; this is right for objects but for arrays need to use slice.
        return this.products.slice();
    }
}
