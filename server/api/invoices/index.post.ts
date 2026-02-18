import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber: body.invoiceNumber,
        client: body.client,
        description: body.description,
        amount: body.amount,
        dueDate: new Date(body.dueDate),
        status: body.status || 'Pending'
      }
    })
    
    return invoice
  } catch (error) {
    console.error('Error creating invoice:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create invoice'
    })
  }
})
