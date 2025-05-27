/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig } from 'mercadopago';
import {
  MercadoPagoPreference,
  MercadoPagoPreferenceResult,
} from './types/mercadopago';

const ACCESS_TOKEN =
  process.env.MERCADOPAGO_ACCESS_TOKEN || 'TU_ACCESS_TOKEN_AQUI';
const mpClient = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

async function createMercadoPagoPreference(
  client: MercadoPagoConfig,
  preference: MercadoPagoPreference,
): Promise<MercadoPagoPreferenceResult> {
  // El SDK de MercadoPago no expone bien los tipos, así que usamos 'as any' aquí
  // pero encapsulamos el acceso inseguro fuera del servicio principal
  const result = await (client as any).preference.create(preference);
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
      const preference: MercadoPagoPreference = {
        items: body.items,
        payer: body.payer,
        back_urls: body.back_urls ?? {
          success: 'http://localhost:3000/success',
          failure: 'http://localhost:3000/failure',
          pending: 'http://localhost:3000/pending',
        },
        auto_return: body.auto_return ?? 'approved',
      };
      return await createMercadoPagoPreference(mpClient, preference);
    } catch (error) {
      throw new Error(
        'Error al crear preferencia de MercadoPago: ' +
          (error as Error).message,
      );
    }
  }
}
