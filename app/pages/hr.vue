<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Human Resources</h1>
      <UButton icon="i-heroicons-plus" @click="isAddModalOpen = true">
        Add Employee
      </UButton>
    </div>

    <!-- HR Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Total Employees</p>
            <p class="text-2xl font-bold text-gray-900">{{ employees.length }}</p>
          </div>
          <UIcon name="i-heroicons-users" class="h-8 w-8 text-blue-500" />
        </div>
      </UCard>
      
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Departments</p>
            <p class="text-2xl font-bold text-gray-900">{{ departments.length }}</p>
          </div>
          <UIcon name="i-heroicons-building-office" class="h-8 w-8 text-green-500" />
        </div>
      </UCard>
      
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">On Leave</p>
            <p class="text-2xl font-bold text-gray-900">{{ onLeaveCount }}</p>
          </div>
          <UIcon name="i-heroicons-calendar-days" class="h-8 w-8 text-yellow-500" />
        </div>
      </UCard>
      
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">New This Month</p>
            <p class="text-2xl font-bold text-gray-900">3</p>
          </div>
          <UIcon name="i-heroicons-user-plus" class="h-8 w-8 text-purple-500" />
        </div>
      </UCard>
    </div>

    <!-- Tabs -->
    <UTabs :items="tabs" class="mb-6">
      <template #employees>
        <div class="mt-6">
          <!-- Search and Filter -->
          <div class="mb-4 flex gap-4">
            <UInput
              v-model="searchQuery"
              placeholder="Search employees..."
              icon="i-heroicons-magnifying-glass"
              class="flex-1"
            />
            <USelect
              v-model="departmentFilter"
              :options="departments"
              placeholder="All Departments"
            />
          </div>

          <!-- Employee Table -->
          <UCard>
            <UTable :columns="employeeColumns" :rows="filteredEmployees">
              <template #employee-data="{ row }">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span class="text-primary-700 font-semibold">{{ getInitials(row.name) }}</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ row.name }}</p>
                    <p class="text-sm text-gray-500">{{ row.email }}</p>
                  </div>
                </div>
              </template>

              <template #salary-data="{ row }">
                <span class="font-semibold">${{ formatNumber(row.salary) }}</span>
              </template>

              <template #status-data="{ row }">
                <UBadge :color="getStatusColor(row.status)">
                  {{ row.status }}
                </UBadge>
              </template>

              <template #actions-data="{ row }">
                <div class="flex gap-2">
                  <UButton icon="i-heroicons-eye" size="xs" variant="ghost" @click="viewEmployee(row)" />
                  <UButton icon="i-heroicons-pencil" size="xs" variant="ghost" @click="editEmployee(row)" />
                </div>
              </template>
            </UTable>
          </UCard>
        </div>
      </template>

      <template #attendance>
        <div class="mt-6">
          <h2 class="text-xl font-semibold mb-4">Attendance Records</h2>
          <UCard>
            <UTable :columns="attendanceColumns" :rows="attendanceRecords">
              <template #status-data="{ row }">
                <UBadge :color="row.status === 'Present' ? 'green' : row.status === 'Absent' ? 'red' : 'yellow'">
                  {{ row.status }}
                </UBadge>
              </template>
            </UTable>
          </UCard>
        </div>
      </template>

      <template #leave>
        <div class="mt-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Leave Requests</h2>
            <UButton icon="i-heroicons-plus" size="sm">Request Leave</UButton>
          </div>
          <UCard>
            <UTable :columns="leaveColumns" :rows="leaveRequests">
              <template #status-data="{ row }">
                <UBadge :color="getLeaveStatusColor(row.status)">
                  {{ row.status }}
                </UBadge>
              </template>
              
              <template #actions-data="{ row }">
                <div class="flex gap-2" v-if="row.status === 'Pending'">
                  <UButton size="xs" color="green" @click="approveLeave(row)">Approve</UButton>
                  <UButton size="xs" color="red" @click="rejectLeave(row)">Reject</UButton>
                </div>
              </template>
            </UTable>
          </UCard>
        </div>
      </template>

      <template #payroll>
        <div class="mt-6">
          <h2 class="text-xl font-semibold mb-4">Payroll Summary</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <UCard>
              <p class="text-sm text-gray-500 mb-2">Monthly Payroll</p>
              <p class="text-2xl font-bold text-gray-900">${{ formatNumber(totalPayroll) }}</p>
            </UCard>
            <UCard>
              <p class="text-sm text-gray-500 mb-2">Average Salary</p>
              <p class="text-2xl font-bold text-gray-900">${{ formatNumber(averageSalary) }}</p>
            </UCard>
            <UCard>
              <p class="text-sm text-gray-500 mb-2">Highest Salary</p>
              <p class="text-2xl font-bold text-gray-900">${{ formatNumber(highestSalary) }}</p>
            </UCard>
          </div>
          
          <UCard>
            <template #header>
              <h3 class="font-semibold">Salary by Department</h3>
            </template>
            <div class="space-y-4">
              <div v-for="dept in departmentPayroll" :key="dept.name" class="flex justify-between items-center py-2 border-b last:border-0">
                <span class="font-medium">{{ dept.name }}</span>
                <span class="font-semibold text-gray-900">${{ formatNumber(dept.total) }}</span>
              </div>
            </div>
          </UCard>
        </div>
      </template>
    </UTabs>

    <!-- Add/Edit Employee Modal -->
    <UModal v-model="isAddModalOpen" :title="editingItem ? 'Edit Employee' : 'Add New Employee'">
      <UForm :state="formData" class="space-y-4 p-4">
        <UFormGroup label="Full Name" name="name" required>
          <UInput v-model="formData.name" />
        </UFormGroup>
        
        <UFormGroup label="Email" name="email" required>
          <UInput v-model="formData.email" type="email" />
        </UFormGroup>
        
        <UFormGroup label="Position" name="position" required>
          <UInput v-model="formData.position" />
        </UFormGroup>
        
        <UFormGroup label="Department" name="department" required>
          <USelect v-model="formData.department" :options="departments" />
        </UFormGroup>
        
        <UFormGroup label="Salary" name="salary" required>
          <UInput v-model.number="formData.salary" type="number" />
        </UFormGroup>
        
        <UFormGroup label="Hire Date" name="hireDate" required>
          <UInput v-model="formData.hireDate" type="date" />
        </UFormGroup>

        <div class="flex justify-end gap-2 pt-4">
          <UButton color="gray" variant="ghost" @click="isAddModalOpen = false">Cancel</UButton>
          <UButton @click="saveEmployee">{{ editingItem ? 'Update' : 'Add' }} Employee</UButton>
        </div>
      </UForm>
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

interface Employee {
  id: number
  name: string
  email: string
  position: string
  department: string
  salary: number
  hireDate: string
  status: string
}

const searchQuery = ref('')
const departmentFilter = ref('')
const isAddModalOpen = ref(false)
const editingItem = ref<Employee | null>(null)

const tabs = [
  { label: 'Employees', slot: 'employees', icon: 'i-heroicons-users' },
  { label: 'Attendance', slot: 'attendance', icon: 'i-heroicons-clock' },
  { label: 'Leave', slot: 'leave', icon: 'i-heroicons-calendar-days' },
  { label: 'Payroll', slot: 'payroll', icon: 'i-heroicons-banknotes' }
]

const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations']

const employeeColumns = [
  { key: 'employee', label: 'Employee' },
  { key: 'position', label: 'Position' },
  { key: 'department', label: 'Department' },
  { key: 'salary', label: 'Salary' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
]

const employees = ref<Employee[]>([
  { id: 1, name: 'John Smith', email: 'john.smith@company.com', position: 'Software Engineer', department: 'Engineering', salary: 85000, hireDate: '2023-01-15', status: 'Active' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@company.com', position: 'Sales Manager', department: 'Sales', salary: 75000, hireDate: '2022-06-01', status: 'Active' },
  { id: 3, name: 'Mike Davis', email: 'mike.d@company.com', position: 'Marketing Specialist', department: 'Marketing', salary: 62000, hireDate: '2023-03-10', status: 'Active' },
  { id: 4, name: 'Emily Brown', email: 'emily.b@company.com', position: 'HR Coordinator', department: 'HR', salary: 58000, hireDate: '2022-11-20', status: 'On Leave' },
  { id: 5, name: 'David Wilson', email: 'david.w@company.com', position: 'Finance Analyst', department: 'Finance', salary: 70000, hireDate: '2023-02-05', status: 'Active' },
])

const attendanceColumns = [
  { key: 'date', label: 'Date' },
  { key: 'employee', label: 'Employee' },
  { key: 'checkIn', label: 'Check In' },
  { key: 'checkOut', label: 'Check Out' },
  { key: 'status', label: 'Status' }
]

const attendanceRecords = ref([
  { id: 1, date: '2024-02-17', employee: 'John Smith', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'Present' },
  { id: 2, date: '2024-02-17', employee: 'Sarah Johnson', checkIn: '08:45 AM', checkOut: '05:15 PM', status: 'Present' },
  { id: 3, date: '2024-02-17', employee: 'Emily Brown', checkIn: '-', checkOut: '-', status: 'On Leave' },
  { id: 4, date: '2024-02-16', employee: 'Mike Davis', checkIn: '09:15 AM', checkOut: '06:00 PM', status: 'Present' },
])

const leaveColumns = [
  { key: 'employee', label: 'Employee' },
  { key: 'type', label: 'Type' },
  { key: 'startDate', label: 'Start Date' },
  { key: 'endDate', label: 'End Date' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
]

const leaveRequests = ref([
  { id: 1, employee: 'Emily Brown', type: 'Sick Leave', startDate: '2024-02-16', endDate: '2024-02-18', status: 'Approved' },
  { id: 2, employee: 'David Wilson', type: 'Vacation', startDate: '2024-03-01', endDate: '2024-03-05', status: 'Pending' },
  { id: 3, employee: 'John Smith', type: 'Personal', startDate: '2024-02-20', endDate: '2024-02-20', status: 'Pending' },
])

const formData = ref({
  name: '',
  email: '',
  position: '',
  department: '',
  salary: 0,
  hireDate: ''
})

const filteredEmployees = computed(() => {
  let result = employees.value
  
  if (searchQuery.value) {
    result = result.filter(emp => 
      emp.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (departmentFilter.value) {
    result = result.filter(emp => emp.department === departmentFilter.value)
  }
  
  return result
})

const onLeaveCount = computed(() => {
  return employees.value.filter(e => e.status === 'On Leave').length
})

const totalPayroll = computed(() => {
  return employees.value.reduce((sum, emp) => sum + emp.salary, 0)
})

const averageSalary = computed(() => {
  return employees.value.length > 0 ? totalPayroll.value / employees.value.length : 0
})

const highestSalary = computed(() => {
  return Math.max(...employees.value.map(e => e.salary))
})

const departmentPayroll = computed(() => {
  const payroll: Record<string, number> = {}
  employees.value.forEach(emp => {
    payroll[emp.department] = (payroll[emp.department] || 0) + emp.salary
  })
  return Object.entries(payroll).map(([name, total]) => ({ name, total }))
})

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const formatNumber = (num: number) => {
  return num.toLocaleString('en-US')
}

const getStatusColor = (status: string) => {
  return status === 'Active' ? 'green' : status === 'On Leave' ? 'yellow' : 'gray'
}

const getLeaveStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'Pending': 'yellow',
    'Approved': 'green',
    'Rejected': 'red'
  }
  return colors[status] || 'gray'
}

const viewEmployee = (emp: Employee) => {
  alert(`Employee Details\n\nName: ${emp.name}\nPosition: ${emp.position}\nDepartment: ${emp.department}\nSalary: $${formatNumber(emp.salary)}`)
}

const editEmployee = (emp: Employee) => {
  editingItem.value = emp
  formData.value = { ...emp }
  isAddModalOpen.value = true
}

const saveEmployee = () => {
  if (editingItem.value) {
    const index = employees.value.findIndex(e => e.id === editingItem.value!.id)
    employees.value[index] = { ...formData.value, id: editingItem.value.id, status: editingItem.value.status }
  } else {
    employees.value.push({
      ...formData.value,
      id: Math.max(...employees.value.map(e => e.id)) + 1,
      status: 'Active'
    })
  }
  
  isAddModalOpen.value = false
  editingItem.value = null
  formData.value = { name: '', email: '', position: '', department: '', salary: 0, hireDate: '' }
}

const approveLeave = (leave: any) => {
  leave.status = 'Approved'
}

const rejectLeave = (leave: any) => {
  leave.status = 'Rejected'
}
</script>
