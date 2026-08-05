"use client";

import { useEffect } from "react";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;

type MercadoPagoInstance = {
  getIdentificationTypes?: () => Promise<unknown>;
};

export const MercadoPagoScript = () => {
  useEffect(() => {
    if (!PUBLIC_KEY || document.getElementById("mp-security")) return;

    const security = document.createElement("script");
    security.id = "mp-security";
    security.src = "https://www.mercadopago.com/v2/security.js";
    security.setAttribute("view", "checkout");
    document.body.appendChild(security);

    const sdk = document.createElement("script");
    sdk.id = "mp-sdk";
    sdk.src = "https://sdk.mercadopago.com/js/v2";
    sdk.onload = () => {
      if (!window.MercadoPago) return;
      const mp = new window.MercadoPago(PUBLIC_KEY) as MercadoPagoInstance;
      try {
        mp.getIdentificationTypes?.().catch(() => {});
      } catch {
        /* noop */
      }
    };
    document.body.appendChild(sdk);
  }, []);

  return null;
};
