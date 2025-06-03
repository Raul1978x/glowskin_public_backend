import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { MercadoPagoService } from './mercadopago.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mpService: MercadoPagoService) {}

  @Post('create-preference')
  @ApiBody({ type: CreatePreferenceDto })
  async createPreference(@Body() body: CreatePreferenceDto) {
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
