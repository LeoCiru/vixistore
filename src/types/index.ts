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