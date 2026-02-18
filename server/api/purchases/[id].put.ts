import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    const purchase = await prisma.purchase.update({
      where: { id: parseInt(id!) },
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
    console.error('Error updating purchase:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update purchase'
    })
  }
})
