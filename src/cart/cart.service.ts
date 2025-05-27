import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async createCart() {
    const token = randomUUID();
    await this.prisma.cart.create({ data: { token } });
    return { token };
  }

  async getCart(token: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { token },
      include: { items: { include: { product: true } } },
    });
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async addToCart(token: string, productId: number, quantity: number = 1) {
    let cart = await this.prisma.cart.findUnique({ where: { token } });
    if (!cart) cart = await this.prisma.cart.create({ data: { token } });
    // Check if item exists
    const existing = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });
    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    }
    return this.prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
    });
  }

  async updateItemQuantity(token: string, itemId: number, quantity: number) {
    const cart = await this.prisma.cart.findUnique({ where: { token } });
    if (!cart) throw new NotFoundException('Cart not found');
    return this.prisma.cartItem.update({
      where: { id: itemId, cartId: cart.id },
      data: { quantity },
    });
  }

  async removeItem(token: string, itemId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { token } });
    if (!cart) throw new NotFoundException('Cart not found');
    return this.prisma.cartItem.delete({
      where: { id: itemId, cartId: cart.id },
    });
  }

  async clearCart(token: string) {
    const cart = await this.prisma.cart.findUnique({ where: { token } });
    if (!cart) throw new NotFoundException('Cart not found');
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return { cleared: true };
  }
}
