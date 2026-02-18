import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const sales = await prisma.sale.findMany({
      orderBy: { date: 'desc' }
    })
    return sales
  } catch (error) {
    console.error('Error fetching sales:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch sales'
    })
  }
})
