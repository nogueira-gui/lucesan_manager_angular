import { Imagen } from "./imagen";

export class Category {
    id?: number;
    active?: boolean;
    code: string;
    description: string;
    image: Imagen | string;
}