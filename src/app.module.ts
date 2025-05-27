import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MercadoPagoController } from './mercadopago.controller';
import { MercadoPagoService } from './mercadopago.service';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [ProductsModule, CartModule],
  controllers: [AppController, MercadoPagoController],
  providers: [AppService, MercadoPagoService],
})
export class AppModule {}
