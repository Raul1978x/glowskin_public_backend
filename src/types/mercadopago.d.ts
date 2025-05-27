export interface MercadoPagoPreferenceItem {
  id?: string;
  title: string;
  description?: string;
  quantity: number;
  unit_price: number;
  currency_id?: string;
}

export interface MercadoPagoPayer {
  email?: string;
  name?: string;
  surname?: string;
}

export interface MercadoPagoPreference {
  items: MercadoPagoPreferenceItem[];
  payer?: MercadoPagoPayer;
  back_urls: {
    success: string;
    failure: string;
    pending: string;
  };
  auto_return?: 'approved' | 'all';
}

export interface MercadoPagoPreferenceResult {
  id: string;
  init_point: string;
}
