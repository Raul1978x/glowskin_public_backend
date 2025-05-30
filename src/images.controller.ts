import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('Imágenes')
@Controller('images')
export class ImagesController {
  @Get('list')
  @ApiOperation({ summary: 'Listar imágenes públicas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de imágenes públicas',
    type: [String],
  })
  listImages(): string[] {
    const imagesDir = path.join(__dirname, '../public/images');
    if (!fs.existsSync(imagesDir)) return [];
    return fs
      .readdirSync(imagesDir)
      .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
      .map((f) => `/images/${f}`);
  }
}
