import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // Habilitar CORS para el frontend
  app.enableCors({
    origin: ['http://localhost:5173', 'https://glowskin-public.vercel.app'],
    credentials: true,
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('GlowSkin API')
    .setDescription('API para gestión de productos GlowSkin')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Backend GlowSkin corriendo en http://localhost:${port}`);
}
void bootstrap();
