/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  ValidateNested,
  IsOptional,
  IsString,
  IsNumber,
  IsObject,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

class Item {
  @ApiProperty({ example: 'Producto de prueba' })
  @IsString()
  title: string;

  @ApiProperty({ required: false, example: 'Descripción opcional' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  unit_price: number;

  @ApiProperty({ required: false, example: 'ARS' })
  @IsOptional()
  @IsString()
  currency_id?: string;
}

class Payer {
  @ApiProperty({ example: 'TEST-BUYER_xxx@testuser.com' })
  @IsString()
  email: string;

  @ApiProperty({ required: false, example: 'Nombre' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, example: 'Apellido' })
  @IsOptional()
  @IsString()
  surname?: string;
}

class BackUrls {
  @ApiProperty({ example: 'https://glowskin.com.ar/pago-exitoso' })
  @IsString()
  success: string;

  @ApiProperty({ example: 'https://glowskin.com.ar/pago-fallido' })
  @IsString()
  failure: string;

  @ApiProperty({ example: 'https://glowskin.com.ar/pago-pendiente' })
  @IsString()
  pending: string;
}

export class CreatePreferenceDto {
  @ApiProperty({
    type: [Item],
    example: [
      {
        title: 'Producto de prueba',
        description: 'Descripción opcional',
        quantity: 1,
        unit_price: 100,
        currency_id: 'ARS',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Item)
  items: Item[];

  @ApiProperty({
    type: Payer,
    required: false,
    example: {
      email: 'TEST-BUYER_xxx@testuser.com',
      name: 'Nombre',
      surname: 'Apellido',
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Payer)
  payer?: Payer;

  @ApiProperty({
    type: BackUrls,
    example: {
      success: 'https://glowskin.com.ar/pago-exitoso',
      failure: 'https://glowskin.com.ar/pago-fallido',
      pending: 'https://glowskin.com.ar/pago-pendiente',
    },
  })
  @ValidateNested()
  @Type(() => BackUrls)
  back_urls: BackUrls;

  @ApiProperty({
    required: false,
    enum: ['approved', 'all'],
    example: 'approved',
  })
  @IsOptional()
  @IsEnum(['approved', 'all'])
  auto_return?: 'approved' | 'all';
}
