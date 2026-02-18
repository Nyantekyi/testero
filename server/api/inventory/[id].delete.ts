import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    await prisma.inventoryItem.delete({
      where: { id: parseInt(id!) }
    })
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting inventory item:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete inventory item'
    })
  }
})
