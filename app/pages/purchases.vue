<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Purchase Orders</h1>
      <UButton icon="i-heroicons-plus" @click="isAddModalOpen = true">
        New Purchase Order
      </UButton>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Total Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ purchases.length }}</p>
          </div>
          <UIcon name="i-heroicons-shopping-bag" class="h-8 w-8 text-blue-500" />
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Total Spend</p>
            <p class="text-2xl font-bold text-gray-900">${{ totalSpend.toFixed(2) }}</p>
          </div>
          <UIcon name="i-heroicons-banknotes" class="h-8 w-8 text-red-500" />
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Pending Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ pendingCount }}</p>
          </div>
          <UIcon name="i-heroicons-clock" class="h-8 w-8 text-yellow-500" />
        </div>
      </UCard>
    </div>

    <!-- Purchases Table -->
    <UCard>
      <template #header>
        <div class="flex gap-4">
          <UInput
            v-model="searchQuery"
            placeholder="Search purchase orders..."
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
        :rows="filteredPurchases"
      >
        <template #supplier-data="{ row }">
          <div>
            <p class="font-medium text-gray-900">{{ row.supplier }}</p>
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
            <UButton icon="i-heroicons-eye" size="xs" variant="ghost" @click="viewPurchase(row)" />
            <UButton icon="i-heroicons-pencil" size="xs" variant="ghost" @click="editPurchase(row)" />
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- Add/Edit Modal -->
    <UModal v-model="isAddModalOpen" :title="editingItem ? 'Edit Purchase Order' : 'New Purchase Order'">
      <UForm :state="formData" class="space-y-4 p-4">
        <UFormGroup label="Supplier Name" name="supplier" required>
          <UInput v-model="formData.supplier" placeholder="Enter supplier name" />
        </UFormGroup>
        
        <UFormGroup label="Email" name="email" required>
          <UInput v-model="formData.email" type="email" placeholder="supplier@example.com" />
        </UFormGroup>
        
        <UFormGroup label="Items/Description" name="items" required>
          <UTextarea v-model="formData.items" placeholder="List of items to purchase" />
        </UFormGroup>
        
        <UFormGroup label="Amount" name="amount" required>
          <UInput v-model.number="formData.amount" type="number" step="0.01" />
        </UFormGroup>
        
        <UFormGroup label="Expected Delivery" name="expectedDate" required>
          <UInput v-model="formData.expectedDate" type="date" />
        </UFormGroup>
        
        <UFormGroup label="Status" name="status" required>
          <USelect v-model="formData.status" :options="statuses" />
        </UFormGroup>

        <div class="flex justify-end gap-2 pt-4">
          <UButton color="gray" variant="ghost" @click="isAddModalOpen = false">
            Cancel
          </UButton>
          <UButton @click="savePurchase">
            {{ editingItem ? 'Update' : 'Create' }} Order
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

interface Purchase {
  id: number
  supplier: string
  email: string
  items: string
  amount: number
  status: string
  orderDate: string
  expectedDate: string
}

const searchQuery = ref('')
const statusFilter = ref('')
const isAddModalOpen = ref(false)
const editingItem = ref<Purchase | null>(null)

const statuses = ['Pending', 'Approved', 'Ordered', 'Received', 'Cancelled']

const columns = [
  { key: 'id', label: 'PO #' },
  { key: 'supplier', label: 'Supplier' },
  { key: 'items', label: 'Items' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'expectedDate', label: 'Expected' },
  { key: 'actions', label: 'Actions' }
]

const purchases = ref<Purchase[]>([
  { id: 2001, supplier: 'Parts Unlimited', email: 'sales@parts.com', items: 'Electronic Components x100', amount: 3500.00, status: 'Ordered', orderDate: '2024-02-10', expectedDate: '2024-02-25' },
  { id: 2002, supplier: 'Office Depot', email: 'orders@depot.com', items: 'Office Furniture', amount: 2800.00, status: 'Received', orderDate: '2024-02-12', expectedDate: '2024-02-20' },
  { id: 2003, supplier: 'Tech Supplies Co', email: 'info@techsupply.com', items: 'Computer Hardware', amount: 5600.00, status: 'Pending', orderDate: '2024-02-15', expectedDate: '2024-03-01' },
  { id: 2004, supplier: 'Industrial Tools Inc', email: 'sales@indtools.com', items: 'Power Tools x20', amount: 1900.00, status: 'Approved', orderDate: '2024-02-16', expectedDate: '2024-02-28' },
  { id: 2005, supplier: 'Raw Materials Ltd', email: 'orders@rawmat.com', items: 'Raw Steel Sheets', amount: 7200.00, status: 'Ordered', orderDate: '2024-02-17', expectedDate: '2024-03-05' },
])

const formData = ref({
  supplier: '',
  email: '',
  items: '',
  amount: 0,
  expectedDate: '',
  status: 'Pending'
})

const filteredPurchases = computed(() => {
  let result = purchases.value
  
  if (searchQuery.value) {
    result = result.filter(purchase => 
      purchase.supplier.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      purchase.items.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (statusFilter.value) {
    result = result.filter(purchase => purchase.status === statusFilter.value)
  }
  
  return result
})

const totalSpend = computed(() => {
  return purchases.value.reduce((sum, purchase) => sum + purchase.amount, 0)
})

const pendingCount = computed(() => {
  return purchases.value.filter(p => p.status === 'Pending' || p.status === 'Approved').length
})

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'Pending': 'yellow',
    'Approved': 'blue',
    'Ordered': 'purple',
    'Received': 'green',
    'Cancelled': 'red'
  }
  return colors[status] || 'gray'
}

const viewPurchase = (purchase: Purchase) => {
  alert(`Viewing PO #${purchase.id}\n\nSupplier: ${purchase.supplier}\nItems: ${purchase.items}\nAmount: $${purchase.amount}`)
}

const editPurchase = (purchase: Purchase) => {
  editingItem.value = purchase
  formData.value = { ...purchase }
  isAddModalOpen.value = true
}

const savePurchase = () => {
  if (editingItem.value) {
    const index = purchases.value.findIndex(p => p.id === editingItem.value!.id)
    purchases.value[index] = { 
      ...formData.value, 
      id: editingItem.value.id, 
      orderDate: editingItem.value.orderDate 
    }
  } else {
    purchases.value.push({
      ...formData.value,
      id: Math.max(...purchases.value.map(p => p.id)) + 1,
      orderDate: new Date().toISOString().split('T')[0]
    })
  }
  
  isAddModalOpen.value = false
  editingItem.value = null
  formData.value = { supplier: '', email: '', items: '', amount: 0, expectedDate: '', status: 'Pending' }
}
</script>
