import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"

export class CreateProductDto {
    
    /** Debe contener un maximo de 50 caracteres
     * @example Termo
     */
@IsString()
@MaxLength(50)
@IsNotEmpty()
name: string

/** Debe contener una descripcion del producto
     * @example Es de acero y sirve para mantener la temperatura del agua, ya sea calor o frio
     */
@IsString()
@IsNotEmpty()
description: string

/** Debe contener el precio del producto
     * @example 15000
     */
@IsNumber()
@IsNotEmpty()
price: number

/** Debe contener la cantidad de productos disponibles para la venta
     * @example 10
     */
@IsNumber()
@IsNotEmpty()
stock: number

/** Debe contener la url de la imagen del producto
     * @example http://ejemplo.com/imagenProducto
     */
@IsString()
imgUrl: string



}
