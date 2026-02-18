import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const category = await prisma.category.create({
      data: {
        name: body.name,
        description: body.description
      }
    })
    
    return category
  } catch (error) {
    console.error('Error creating category:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create category'
    })
  }
})
