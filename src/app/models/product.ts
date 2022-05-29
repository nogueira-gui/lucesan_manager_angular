import { Imagen } from "./imagen";

export class Product {
    id?: number;
    name: string;
    description: string;
    images: Imagen;
    highlighted: boolean;
    category: string;
    subCategory: string;
    price: number;
    quantity: number;
    available: boolean;
}
