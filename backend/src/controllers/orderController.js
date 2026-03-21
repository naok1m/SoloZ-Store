import { createOrder } from '../services/orderService.js'

export const createOrderController = async (req, res, next) => {
  try {
    const { productId, playerNickname, paymentMethod, payerEmail } = req.validatedBody
    const result = await createOrder({
      productId: String(productId),
      playerNickname,
      paymentMethod,
      payerEmail,
    })

    res.status(201).json({
      order: result.order,
      payment: {
        id: result.payment.id,
        status: result.payment.status,
        method: result.payment.method,
        qrCode: result.payment.qrCode || null,
        qrCodeBase64: result.payment.qrCodeBase64 || null,
        ticketUrl: result.payment.ticketUrl || null,
        checkoutUrl: result.payment.checkoutUrl || null,
      },
    })
  } catch (error) {
    next(error)
  }
}
