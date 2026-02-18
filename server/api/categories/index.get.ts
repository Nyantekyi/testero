import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        inventoryItems: true
      },
      orderBy: { name: 'asc' }
    })
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch categories'
    })
  }
})
