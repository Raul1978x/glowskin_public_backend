import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Productos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos',
    type: [CreateProductDto],
  })
  findAll(): Promise<CreateProductDto[]> {
    return this.productsService.findAll() as unknown as Promise<
      CreateProductDto[]
    >;
  }

  @Post()
  @ApiOperation({ summary: 'Crear un producto' })
  @ApiBody({
    type: CreateProductDto,
    examples: {
      ejemplo: {
        value: {
          name: 'Crema Hidratante',
          description: 'Crema para piel seca',
          image: 'https://glowskin.com/crema.jpg',
          price: '29.99',
          category: 'Hidratantes',
          presentationQuantity: '250ml',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Producto creado',
    type: CreateProductDto,
  })
  create(@Body() data: CreateProductDto): Promise<CreateProductDto> {
    return this.productsService.create(
      data,
    ) as unknown as Promise<CreateProductDto>;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({
    type: UpdateProductDto,
    examples: {
      ejemplo: {
        value: {
          name: 'Crema Hidratante Premium',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado',
    type: CreateProductDto,
  })
  update(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<CreateProductDto> {
    return this.productsService.update(
      Number(id),
      data,
    ) as unknown as Promise<CreateProductDto>;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 204,
    description: 'Producto eliminado (sin contenido).',
  })
  async delete(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: import('express').Response,
  ) {
    await this.productsService.delete(Number(id));
    return res.status(204).send();
  }
}
