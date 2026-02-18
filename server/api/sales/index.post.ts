import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const sale = await prisma.sale.create({
      data: {
        customerId: body.customerId,
        product: body.product,
        amount: body.amount,
        tax: body.tax || 0,
        total: body.total || body.amount,
        status: body.status || 'Pending',
        notes: body.notes
      },
      include: {
        customer: true
      }
    })
    
    return sale
  } catch (error) {
    console.error('Error creating sale:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create sale'
    })
  }
})
