interface Window {
  MercadoPago: new (publicKey: string, options?: Record<string, unknown>) => unknown;
  MP_DEVICE_SESSION_ID?: string;
}
