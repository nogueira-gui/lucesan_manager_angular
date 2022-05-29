import { Imagen } from "./imagen";

export class Campaign {
    id?: number;
    active?: boolean;
    code: string;
    description: string;
    priceCut?: number;
    image: Imagen | string;
}