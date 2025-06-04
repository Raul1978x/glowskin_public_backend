import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Param,
  Delete,
  Patch,
  Res,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('create')
  createCart(): Promise<{ token: string }> {
    return this.cartService.createCart();
  }

  @Get(':token')
  getCart(@Param('token') token: string) {
    return this.cartService.getCart(token);
  }

  @Post(':token/add')
  addToCart(
    @Param('token') token: string,
    @Body() body: { productId?: number; quantity?: number },
  ) {
    if (!body || typeof body.productId !== 'number') {
      throw new BadRequestException('Body must include a valid productId');
    }
    return this.cartService.addToCart(
      token,
      body.productId,
      body.quantity ?? 1,
    );
  }

  @Patch(':token/item/:itemId')
  updateItemQuantity(
    @Param('token') token: string,
    @Param('itemId') itemId: string,
    @Body() body: { quantity?: number },
  ) {
    if (!body || typeof body.quantity !== 'number') {
      throw new BadRequestException('Body must include a valid quantity');
    }
    const itemIdNum = Number(itemId);
    if (isNaN(itemIdNum)) {
      throw new BadRequestException('itemId must be a number');
    }
    return this.cartService.updateItemQuantity(token, itemIdNum, body.quantity);
  }

  @Delete(':token/item/:itemId')
  /**
   * Elimina un ítem del carrito
   * @returns 204 No Content si se elimina correctamente
   */
  @ApiOperation({ summary: 'Eliminar un ítem del carrito' })
  @ApiResponse({ status: 204, description: 'Ítem eliminado (sin contenido).' })
  async removeItem(
    @Param('token') token: string,
    @Param('itemId') itemId: string,
    @Res({ passthrough: true }) res: import('express').Response,
  ) {
    const itemIdNum = Number(itemId);
    if (isNaN(itemIdNum)) {
      throw new BadRequestException('itemId must be a number');
    }
    await this.cartService.removeItem(token, itemIdNum);
    return res.status(204).send();
  }

  @Delete(':token/clear')
  /**
   * Vacía el carrito completamente
   * @returns 204 No Content si se vacía correctamente
   */
  @ApiOperation({ summary: 'Vaciar el carrito' })
  @ApiResponse({ status: 204, description: 'Carrito vaciado (sin contenido).' })
  async clearCart(
    @Param('token') token: string,
    @Res({ passthrough: true }) res: import('express').Response,
  ) {
    await this.cartService.clearCart(token);
    return res.status(204).send();
  }
}
