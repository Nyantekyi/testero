import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: {
        purchases: true
      },
      orderBy: { createdAt: 'desc' }
    })
    return suppliers
  } catch (error) {
    console.error('Error fetching suppliers:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch suppliers'
    })
  }
})
