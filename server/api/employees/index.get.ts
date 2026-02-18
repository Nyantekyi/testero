import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return employees
  } catch (error) {
    console.error('Error fetching employees:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch employees'
    })
  }
})
