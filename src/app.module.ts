import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { MercadoPagoController } from './mercadopago.controller';
import { MercadoPagoService } from './mercadopago.service';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { UploadsController } from './uploads.controller';
import { ImagesModule } from './images.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    UsersModule,
    AuthModule,
    CartModule,
    ImagesModule,
  ],
  controllers: [AppController, MercadoPagoController, UploadsController],
  providers: [AppService, MercadoPagoService],
})
export class AppModule {}
