import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const purchase = await prisma.purchase.create({
      data: {
        supplier: body.supplier,
        email: body.email,
        items: body.items,
        amount: body.amount,
        status: body.status,
        expectedDate: new Date(body.expectedDate)
      }
    })
    
    return purchase
  } catch (error) {
    console.error('Error creating purchase:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create purchase'
    })
  }
})
