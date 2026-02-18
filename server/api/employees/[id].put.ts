import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    const employee = await prisma.employee.update({
      where: { id: parseInt(id!) },
      data: {
        name: body.name,
        email: body.email,
        position: body.position,
        department: body.department,
        salary: body.salary,
        hireDate: new Date(body.hireDate),
        status: body.status
      }
    })
    
    return employee
  } catch (error) {
    console.error('Error updating employee:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update employee'
    })
  }
})
