import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  // Devuelve todas las URLs de imágenes subidas (por ejemplo, de productos)
  async getUploadedImages(): Promise<string[]> {
    // Busca todas las imágenes registradas en productos
    const products = await this.prisma.product.findMany({
      select: { image: true },
      where: { image: { not: '' } },
    });
    // Filtra y devuelve solo URLs válidas
    return products
      .map((p) => p.image)
      .filter((url) => typeof url === 'string' && url.length > 0);
  }
}
