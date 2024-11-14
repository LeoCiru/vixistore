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

export type ProductDetail = Omit<Products, 'category' | 'id'> & {
    description: string
}