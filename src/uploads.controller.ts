import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { put } from '@vercel/blob';
import * as sharp from 'sharp';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

// Tipado explícito para archivos Multer
export interface SafeMulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

function isSafeMulterFile(file: unknown): file is SafeMulterFile {
  return (
    !!file &&
    typeof file === 'object' &&
    typeof (file as Record<string, unknown>).originalname === 'string' &&
    typeof (file as Record<string, unknown>).mimetype === 'string' &&
    typeof (file as Record<string, unknown>).size === 'number' &&
    (file as Record<string, unknown>).buffer instanceof Buffer
  );
}

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  @Post('image')
  @ApiOperation({ summary: 'Subir una imagen y obtener URL optimizada' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Imagen a subir',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'URL de la imagen subida',
    schema: {
      example: { url: 'https://blob.vercel-storage.com/tu-bucket/imagen.webp' },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: unknown): Promise<{ url: string }> {
    if (!isSafeMulterFile(file)) {
      throw new HttpException(
        'Archivo inválido o no recibido',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Solo permitimos imágenes
    if (!file.mimetype.startsWith('image/')) {
      throw new HttpException(
        'Solo se permiten imágenes',
        HttpStatus.BAD_REQUEST,
      );
    }
    // (Opcional) Limita el tamaño máximo permitido (ej: 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new HttpException(
        'La imagen es demasiado grande (máx 5MB)',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Optimiza la imagen (resize y WebP)
    const optimizedBuffer = await sharp(file.buffer)
      .resize({ width: 1200 })
      .webp({ quality: 80 })
      .toBuffer();
    // Sube a Vercel Blob Storage
    const { url } = await put(
      file.originalname.replace(/\.[^.]+$/, '.webp'),
      optimizedBuffer,
      { access: 'public', token: BLOB_TOKEN, addRandomSuffix: true },
    );
    return { url };
  }
}
