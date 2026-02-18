import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const purchase = await prisma.purchase.create({
      data: {
        supplierId: body.supplierId,
        items: body.items,
        amount: body.amount,
        tax: body.tax || 0,
        total: body.total || body.amount,
        status: body.status || 'Pending',
        expectedDate: new Date(body.expectedDate),
        receivedDate: body.receivedDate ? new Date(body.receivedDate) : null,
        notes: body.notes
      },
      include: {
        supplier: true
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
