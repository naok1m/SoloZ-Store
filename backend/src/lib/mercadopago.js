import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'
import { env } from '../config/env.js'

const client = new MercadoPagoConfig({
  accessToken: env.MP_ACCESS_TOKEN,
})

export const paymentClient = new Payment(client)
export const preferenceClient = new Preference(client)
