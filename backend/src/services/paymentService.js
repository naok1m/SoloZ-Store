import { paymentClient, preferenceClient } from '../lib/mercadopago.js'

const createDirectPayment = async ({
  amount,
  description,
  orderId,
  playerNickname,
  minecraftCommand,
  method,
  payerEmail,
}) => {
  const paymentMethodId = method === 'boleto' ? 'bolbradesco' : 'pix'

  const response = await paymentClient.create({
    body: {
      transaction_amount: amount,
      description,
      payment_method_id: paymentMethodId,
      payer: {
        email: payerEmail || `${playerNickname}@soloz.local`,
      },
      metadata: {
        orderId,
        playerNickname,
        minecraftCommand,
      },
    },
  })

  const txData = response?.point_of_interaction?.transaction_data
  return {
    id: String(response.id),
    status: response.status,
    method,
    qrCode: txData?.qr_code || null,
    qrCodeBase64: txData?.qr_code_base64 || null,
    ticketUrl: txData?.ticket_url || null,
    checkoutUrl: null,
    raw: response,
  }
}

const createCardCheckout = async ({ amount, description, orderId, playerNickname }) => {
  const response = await preferenceClient.create({
    body: {
      external_reference: orderId,
      items: [
        {
          title: description,
          quantity: 1,
          unit_price: amount,
          currency_id: 'BRL',
        },
      ],
      payer: {
        email: `${playerNickname}@soloz.local`,
      },
      metadata: {
        orderId,
        playerNickname,
      },
    },
  })

  return {
    id: String(response.id),
    status: 'pending_checkout',
    method: 'card',
    qrCode: null,
    qrCodeBase64: null,
    ticketUrl: null,
    checkoutUrl: response.init_point || response.sandbox_init_point || null,
    raw: response,
  }
}

export const createPayment = async ({
  amount,
  description,
  orderId,
  playerNickname,
  minecraftCommand,
  method = 'pix',
  payerEmail,
}) => {
  if (method === 'card') {
    return createCardCheckout({ amount, description, orderId, playerNickname })
  }

  return createDirectPayment({
    amount,
    description,
    orderId,
    playerNickname,
    minecraftCommand,
    method,
    payerEmail,
  })
}

export const getPayment = async (paymentId) => {
  const response = await paymentClient.get({ id: paymentId })
  return response
}
