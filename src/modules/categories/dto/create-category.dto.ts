import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    /**
     * Nombre de la categoria
     * @example Electrodomesticos
     */
    @IsString()
    @IsNotEmpty()
    name:string
}
