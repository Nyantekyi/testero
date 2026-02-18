import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const supplier = await prisma.supplier.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address
      }
    })
    
    return supplier
  } catch (error) {
    console.error('Error creating supplier:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create supplier'
    })
  }
})
