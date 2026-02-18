import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const employee = await prisma.employee.create({
      data: {
        name: body.name,
        email: body.email,
        position: body.position,
        department: body.department,
        salary: body.salary,
        hireDate: new Date(body.hireDate),
        status: body.status || 'Active'
      }
    })
    
    return employee
  } catch (error) {
    console.error('Error creating employee:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create employee'
    })
  }
})
