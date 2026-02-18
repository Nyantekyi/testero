import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        supplier: true
      },
      orderBy: { orderDate: 'desc' }
    })
    return purchases
  } catch (error) {
    console.error('Error fetching purchases:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch purchases'
    })
  }
})
