import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      orderBy: { id: 'asc' },
    });
    // Asegura que todos tengan presentationQuantity
    return products.map((p) => ({
      ...p,
      presentationQuantity: (p.presentationQuantity ?? '').toString(),
    }));
  }

  async create(data: Omit<Product, 'id'>): Promise<Product> {
    const product = await this.prisma.product.create({ data });
    return {
      ...product,
      presentationQuantity: (product.presentationQuantity ?? '').toString(),
    };
  }

  async update(id: number, data: Partial<Product>): Promise<Product> {
    const product = await this.prisma.product.update({ where: { id }, data });
    return {
      ...product,
      presentationQuantity: (product.presentationQuantity ?? '').toString(),
    };
  }

  async delete(id: number): Promise<{ success: boolean }> {
    await this.prisma.product.delete({ where: { id } });
    return { success: true };
  }
}
