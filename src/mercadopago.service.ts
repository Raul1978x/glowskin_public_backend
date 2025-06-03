/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import {
  MercadoPagoPreference,
  MercadoPagoPreferenceResult,
} from './types/mercadopago';

const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
console.log('[MercadoPago] ACCESS_TOKEN:', ACCESS_TOKEN);
if (!ACCESS_TOKEN) {
  throw new Error('MERCADOPAGO_ACCESS_TOKEN no está definido en el entorno');
}
const mpClient = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });
console.log('[MercadoPago] mpClient.preference:', (mpClient as any).preference);

async function createMercadoPagoPreference(
  client: MercadoPagoConfig,
  preference: MercadoPagoPreference,
): Promise<MercadoPagoPreferenceResult> {
  const pref = new Preference(client);
  const result = await pref.create({ body: preference as any });
  if (
    result &&
    typeof result === 'object' &&
    'id' in result &&
    'init_point' in result
  ) {
    const { id, init_point } = result as { id: string; init_point: string };
    return { id, init_point };
  }
  throw new Error('Respuesta inesperada de MercadoPago');
}

@Injectable()
export class MercadoPagoService {
  async createPreference(
    body: MercadoPagoPreference,
  ): Promise<MercadoPagoPreferenceResult> {
    try {
      // Limpia los items para eliminar el campo id (evita error de tipo)
      const cleanItems = body.items.map(({ id, ...rest }) => rest);
      const preferenceClean = {
        ...body,
        items: cleanItems,
        back_urls: body.back_urls ?? {
          success: 'https://glowskin.com.ar/pago-exitoso',
          failure: 'https://glowskin.com.ar/pago-fallido',
          pending: 'https://glowskin.com.ar/pago-pendiente',
        },
        auto_return: body.auto_return ?? 'approved',
      };
      return await createMercadoPagoPreference(mpClient, preferenceClean);
    } catch (error) {
      console.error('[MercadoPago] Error real:', error);
      throw new Error(
        'Error al crear preferencia de MercadoPago: ' +
          (error as Error).message,
      );
    }
  }
}
