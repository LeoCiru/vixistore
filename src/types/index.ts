export type Categories = string[];

export type Products = {
    id: string,
    title: string,
    image: string,
    category: string,
    rating: {
        rate: number
    },
    price: number
}

export type ProductDetail = Products & {
    description: string,
    count?: number;
}

export type ProductForm = {
    id: number
    title: string,
    price: number,
    description: string,
    image: string,
    category: string,
}