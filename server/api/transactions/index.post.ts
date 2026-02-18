import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const transaction = await prisma.transaction.create({
      data: {
        description: body.description,
        type: body.type,
        category: body.category,
        amount: body.amount,
        date: new Date(body.date)
      }
    })
    
    return transaction
  } catch (error) {
    console.error('Error creating transaction:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create transaction'
    })
  }
})
