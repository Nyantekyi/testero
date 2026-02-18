<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Sales Management</h1>
      <UButton icon="i-heroicons-plus" @click="isAddModalOpen = true">
        New Sale
      </UButton>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Total Sales</p>
            <p class="text-2xl font-bold text-gray-900">{{ sales.length }}</p>
          </div>
          <UIcon name="i-heroicons-shopping-cart" class="h-8 w-8 text-blue-500" />
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Total Revenue</p>
            <p class="text-2xl font-bold text-gray-900">${{ totalRevenue.toFixed(2) }}</p>
          </div>
          <UIcon name="i-heroicons-currency-dollar" class="h-8 w-8 text-green-500" />
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Avg Sale Value</p>
            <p class="text-2xl font-bold text-gray-900">${{ averageSale.toFixed(2) }}</p>
          </div>
          <UIcon name="i-heroicons-chart-bar" class="h-8 w-8 text-purple-500" />
        </div>
      </UCard>
    </div>

    <!-- Sales Table -->
    <UCard>
      <template #header>
        <div class="flex gap-4">
          <UInput
            v-model="searchQuery"
            placeholder="Search sales..."
            icon="i-heroicons-magnifying-glass"
            class="flex-1"
          />
          <USelect
            v-model="statusFilter"
            :options="statuses"
            placeholder="All Statuses"
          />
        </div>
      </template>
      
      <UTable
        :columns="columns"
        :rows="filteredSales"
      >
        <template #customer-data="{ row }">
          <div>
            <p class="font-medium text-gray-900">{{ row.customer }}</p>
            <p class="text-sm text-gray-500">{{ row.email }}</p>
          </div>
        </template>

        <template #amount-data="{ row }">
          <span class="font-semibold text-gray-900">${{ row.amount.toFixed(2) }}</span>
        </template>

        <template #status-data="{ row }">
          <UBadge :color="getStatusColor(row.status)">
            {{ row.status }}
          </UBadge>
        </template>

        <template #actions-data="{ row }">
          <div class="flex gap-2">
            <UButton icon="i-heroicons-eye" size="xs" variant="ghost" @click="viewSale(row)" />
            <UButton icon="i-heroicons-pencil" size="xs" variant="ghost" @click="editSale(row)" />
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- Add/Edit Modal -->
    <UModal v-model="isAddModalOpen" :title="editingItem ? 'Edit Sale' : 'New Sale'">
      <UForm :state="formData" class="space-y-4 p-4">
        <UFormGroup label="Customer Name" name="customer" required>
          <UInput v-model="formData.customer" placeholder="Enter customer name" />
        </UFormGroup>
        
        <UFormGroup label="Email" name="email" required>
          <UInput v-model="formData.email" type="email" placeholder="customer@example.com" />
        </UFormGroup>
        
        <UFormGroup label="Product" name="product" required>
          <UInput v-model="formData.product" placeholder="Product or service name" />
        </UFormGroup>
        
        <UFormGroup label="Amount" name="amount" required>
          <UInput v-model.number="formData.amount" type="number" step="0.01" />
        </UFormGroup>
        
        <UFormGroup label="Status" name="status" required>
          <USelect v-model="formData.status" :options="statuses" />
        </UFormGroup>

        <div class="flex justify-end gap-2 pt-4">
          <UButton color="gray" variant="ghost" @click="isAddModalOpen = false">
            Cancel
          </UButton>
          <UButton @click="saveSale">
            {{ editingItem ? 'Update' : 'Create' }} Sale
          </UButton>
        </div>
      </UForm>
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

interface Sale {
  id: number
  customer: string
  email: string
  product: string
  amount: number
  status: string
  date: string
}

const searchQuery = ref('')
const statusFilter = ref('')
const isAddModalOpen = ref(false)
const editingItem = ref<Sale | null>(null)

const statuses = ['Pending', 'Completed', 'Cancelled', 'Refunded']

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'product', label: 'Product' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' },
  { key: 'actions', label: 'Actions' }
]

const sales = ref<Sale[]>([
  { id: 1001, customer: 'Acme Corp', email: 'contact@acme.com', product: 'Premium Widget Pack', amount: 2450.00, status: 'Completed', date: '2024-02-15' },
  { id: 1002, customer: 'TechStart Inc', email: 'info@techstart.com', product: 'Standard Service', amount: 1200.00, status: 'Completed', date: '2024-02-15' },
  { id: 1003, customer: 'Global Systems', email: 'sales@global.com', product: 'Enterprise Package', amount: 5600.00, status: 'Pending', date: '2024-02-16' },
  { id: 1004, customer: 'SmallBiz LLC', email: 'owner@smallbiz.com', product: 'Starter Kit', amount: 450.00, status: 'Completed', date: '2024-02-17' },
  { id: 1005, customer: 'MegaCorp Industries', email: 'procurement@mega.com', product: 'Bulk Order', amount: 8900.00, status: 'Pending', date: '2024-02-17' },
])

const formData = ref({
  customer: '',
  email: '',
  product: '',
  amount: 0,
  status: 'Pending'
})

const filteredSales = computed(() => {
  let result = sales.value
  
  if (searchQuery.value) {
    result = result.filter(sale => 
      sale.customer.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      sale.product.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (statusFilter.value) {
    result = result.filter(sale => sale.status === statusFilter.value)
  }
  
  return result
})

const totalRevenue = computed(() => {
  return sales.value.reduce((sum, sale) => sum + sale.amount, 0)
})

const averageSale = computed(() => {
  return sales.value.length > 0 ? totalRevenue.value / sales.value.length : 0
})

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'Pending': 'yellow',
    'Completed': 'green',
    'Cancelled': 'red',
    'Refunded': 'orange'
  }
  return colors[status] || 'gray'
}

const viewSale = (sale: Sale) => {
  alert(`Viewing sale #${sale.id}\n\nCustomer: ${sale.customer}\nProduct: ${sale.product}\nAmount: $${sale.amount}`)
}

const editSale = (sale: Sale) => {
  editingItem.value = sale
  formData.value = { ...sale }
  isAddModalOpen.value = true
}

const saveSale = () => {
  if (editingItem.value) {
    const index = sales.value.findIndex(s => s.id === editingItem.value!.id)
    sales.value[index] = { ...formData.value, id: editingItem.value.id, date: editingItem.value.date }
  } else {
    sales.value.push({
      ...formData.value,
      id: Math.max(...sales.value.map(s => s.id)) + 1,
      date: new Date().toISOString().split('T')[0]
    })
  }
  
  isAddModalOpen.value = false
  editingItem.value = null
  formData.value = { customer: '', email: '', product: '', amount: 0, status: 'Pending' }
}
</script>
