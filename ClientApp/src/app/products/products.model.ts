
export interface Product {
    asin: string;
    title: string;
    price: number;
    URL: string;
    imageUrl: string;
    BSR: number;
    category: string;
    keywords: Keyword[];
    status?: 'stage1' | 'stage2' | 'stage3' | null;
}

export interface Keyword {
    keyword: string;
    amountSearched: number;
}