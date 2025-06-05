import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';

import { publicProductsCors } from './middlewares/publicProductsCors.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // Habilitar CORS global solo para dominios confiables
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://glowskin-public.vercel.app',
      'https://glowskin.com.ar',
      'https://www.glowskin.com.ar',
    ],
    credentials: true,
  });

  // Middleware para CORS público solo en GET /products
  app.use(publicProductsCors);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('GlowSkin API')
    .setDescription('API para gestión de productos GlowSkin')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description:
          'Introduce solo el token JWT. El prefijo Bearer es automático.',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Backend GlowSkin corriendo en http://localhost:${port}`);
}
void bootstrap();
