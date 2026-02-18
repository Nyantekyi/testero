import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const items = await prisma.inventoryItem.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return items
  } catch (error) {
    console.error('Error fetching inventory items:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch inventory items'
    })
  }
})
