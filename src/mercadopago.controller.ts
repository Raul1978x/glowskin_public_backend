/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Post, Body } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mpService: MercadoPagoService) {}

  @Post('create-preference')
  async createPreference(@Body() body: any) {
    // body: { items, payer }
    return this.mpService.createPreference(body);
  }

  @Post('webhook')
  webhook(@Body() body: any) {
    // Aquí puedes procesar la notificación de Mercado Pago
    console.log(
      '[MercadoPago Webhook] Notificación recibida:',
      JSON.stringify(body),
    );
    // TODO: Actualizar estado de orden en base de datos según payment_id/status
    return { received: true };
  }
}
