import { Controller, Get } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('Imágenes')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @Get('list')
  @ApiOperation({ summary: 'Listar imágenes públicas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de imágenes públicas',
    type: [String],
  })
  @Get('list')
  @ApiOperation({ summary: 'Listar todas las imágenes públicas y subidas' })
  @ApiResponse({
    status: 200,
    description:
      'Devuelve un array con rutas relativas de imágenes locales y URLs de imágenes subidas (por ejemplo, de productos) en orden único.',
    schema: {
      example: [
        '/images/Logo_mini.png',
        '/images/GlowSkin_logo.png',
        'https://blob.vercel-storage.com/tu-bucket/imagen1.webp',
        'https://blob.vercel-storage.com/tu-bucket/imagen2.webp',
      ],
      type: 'array',
      items: { type: 'string' },
    },
  })
  async listImages(): Promise<string[]> {
    const imagesDir = path.join(__dirname, '../public/images');
    let localImages: string[] = [];
    if (fs.existsSync(imagesDir)) {
      localImages = fs
        .readdirSync(imagesDir)
        .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
        .map((f) => `/images/${f}`);
    }
    // Obtener URLs de imágenes subidas (externas)
    const externalImages = await this.imagesService.getUploadedImages();
    // Unir ambas fuentes y eliminar duplicados
    const allImages = Array.from(new Set([...localImages, ...externalImages]));
    return allImages;
  }
}
