import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({ orderBy: { id: 'asc' } });
  }

  async create(data: Omit<Product, 'id'>): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async update(id: number, data: Partial<Product>): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  async delete(id: number): Promise<{ success: boolean }> {
    await this.prisma.product.delete({ where: { id } });
    return { success: true };
  }
}
