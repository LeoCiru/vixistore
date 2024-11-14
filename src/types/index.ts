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

/* export type ProductDetail = {
    id: number,
    title: string,
    image: string,
    category: string,
    rating: {
        rate: number,
        count?: number
    },
    price: number,
    description: string
} */