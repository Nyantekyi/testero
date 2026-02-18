import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const customer = await prisma.customer.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address
      }
    })
    
    return customer
  } catch (error) {
    console.error('Error creating customer:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create customer'
    })
  }
})
