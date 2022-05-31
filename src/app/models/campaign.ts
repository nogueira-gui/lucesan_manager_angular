import { Imagen } from "./imagen";

export class Campaign {
    id?: number;
    active?: boolean;
    name: string;
    description: string;
    image: Imagen | string;
}