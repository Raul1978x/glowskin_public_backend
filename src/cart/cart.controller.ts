import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';

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
    @Body() body: { productId: number; quantity?: number },
  ) {
    return this.cartService.addToCart(
      token,
      body.productId,
      body.quantity ?? 1,
    );
  }

  @Patch(':token/item/:itemId')
  updateItemQuantity(
    @Param('token') token: string,
    @Param('itemId') itemId: number,
    @Body() body: { quantity: number },
  ) {
    return this.cartService.updateItemQuantity(token, itemId, body.quantity);
  }

  @Delete(':token/item/:itemId')
  removeItem(@Param('token') token: string, @Param('itemId') itemId: number) {
    return this.cartService.removeItem(token, itemId);
  }

  @Delete(':token/clear')
  clearCart(@Param('token') token: string) {
    return this.cartService.clearCart(token);
  }
}
