import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Crema Hidratante',
    description: 'Nombre del producto',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Crema para piel seca',
    description: 'Descripción del producto',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'https://glowskin.com/crema.jpg',
    description: 'URL de la imagen del producto',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: '29.99', description: 'Precio del producto' })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    example: 'Hidratantes',
    description: 'Categoría del producto',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: '250ml',
    description: 'Cantidad según presentación (ej: 250ml, 30g, 1L)',
  })
  @IsString()
  @IsNotEmpty()
  presentationQuantity: string;
}
