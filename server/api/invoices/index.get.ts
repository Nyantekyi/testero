import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return invoices
  } catch (error) {
    console.error('Error fetching invoices:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch invoices'
    })
  }
})
