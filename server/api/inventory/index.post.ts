import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const item = await prisma.inventoryItem.create({
      data: {
        name: body.name,
        sku: body.sku,
        category: body.category,
        quantity: body.quantity,
        minQuantity: body.minQuantity,
        price: body.price
      }
    })
    
    return item
  } catch (error) {
    console.error('Error creating inventory item:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create inventory item'
    })
  }
})
