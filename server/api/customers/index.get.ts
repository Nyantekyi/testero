import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        sales: true
      },
      orderBy: { createdAt: 'desc' }
    })
    return customers
  } catch (error) {
    console.error('Error fetching customers:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch customers'
    })
  }
})
