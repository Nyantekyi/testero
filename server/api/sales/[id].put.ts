import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    const sale = await prisma.sale.update({
      where: { id: parseInt(id!) },
      data: {
        customer: body.customer,
        email: body.email,
        product: body.product,
        amount: body.amount,
        status: body.status
      }
    })
    
    return sale
  } catch (error) {
    console.error('Error updating sale:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update sale'
    })
  }
})
