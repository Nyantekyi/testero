<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Inventory Management</h1>
      <UButton icon="i-heroicons-plus" @click="isAddModalOpen = true">
        Add Item
      </UButton>
    </div>

    <!-- Search and Filter -->
    <div class="mb-6 flex gap-4">
      <UInput
        v-model="searchQuery"
        placeholder="Search items..."
        icon="i-heroicons-magnifying-glass"
        class="flex-1"
      />
      <USelect
        v-model="categoryFilter"
        :options="categories"
        placeholder="All Categories"
      />
    </div>

    <!-- Inventory Table -->
    <UCard>
      <UTable
        :columns="columns"
        :rows="filteredItems"
      >
        <template #name-data="{ row }">
          <div>
            <p class="font-medium text-gray-900">{{ row.name }}</p>
            <p class="text-sm text-gray-500">SKU: {{ row.sku }}</p>
          </div>
        </template>
        
        <template #quantity-data="{ row }">
          <span :class="row.quantity <= row.minQuantity ? 'text-red-600 font-semibold' : 'text-gray-900'">
            {{ row.quantity }}
          </span>
        </template>

        <template #status-data="{ row }">
          <UBadge
            :color="row.quantity <= row.minQuantity ? 'red' : row.quantity <= row.minQuantity * 2 ? 'yellow' : 'green'"
          >
            {{ getStockStatus(row) }}
          </UBadge>
        </template>

        <template #actions-data="{ row }">
          <div class="flex gap-2">
            <UButton icon="i-heroicons-pencil" size="xs" variant="ghost" @click="editItem(row)" />
            <UButton icon="i-heroicons-trash" size="xs" variant="ghost" color="red" @click="deleteItem(row)" />
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- Add/Edit Modal -->
    <UModal v-model="isAddModalOpen" :title="editingItem ? 'Edit Item' : 'Add New Item'">
      <UForm :state="formData" class="space-y-4 p-4">
        <UFormGroup label="Item Name" name="name" required>
          <UInput v-model="formData.name" placeholder="Enter item name" />
        </UFormGroup>
        
        <UFormGroup label="SKU" name="sku" required>
          <UInput v-model="formData.sku" placeholder="Enter SKU" />
        </UFormGroup>
        
        <UFormGroup label="Category" name="category" required>
          <USelect v-model="formData.category" :options="categories" />
        </UFormGroup>
        
        <UFormGroup label="Quantity" name="quantity" required>
          <UInput v-model.number="formData.quantity" type="number" />
        </UFormGroup>
        
        <UFormGroup label="Minimum Quantity" name="minQuantity" required>
          <UInput v-model.number="formData.minQuantity" type="number" />
        </UFormGroup>
        
        <UFormGroup label="Unit Price" name="price" required>
          <UInput v-model.number="formData.price" type="number" step="0.01" />
        </UFormGroup>

        <div class="flex justify-end gap-2 pt-4">
          <UButton color="gray" variant="ghost" @click="isAddModalOpen = false">
            Cancel
          </UButton>
          <UButton @click="saveItem">
            {{ editingItem ? 'Update' : 'Add' }} Item
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

interface InventoryItem {
  id: number
  name: string
  sku: string
  category: string
  quantity: number
  minQuantity: number
  price: number
}

const searchQuery = ref('')
const categoryFilter = ref('')
const isAddModalOpen = ref(false)
const editingItem = ref<InventoryItem | null>(null)

const categories = ['Electronics', 'Furniture', 'Office Supplies', 'Tools', 'Raw Materials']

const columns = [
  { key: 'name', label: 'Item' },
  { key: 'category', label: 'Category' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'minQuantity', label: 'Min Qty' },
  { key: 'price', label: 'Price' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
]

const items = ref<InventoryItem[]>([
  { id: 1, name: 'Premium Widget', sku: 'WGT-001', category: 'Electronics', quantity: 5, minQuantity: 20, price: 49.99 },
  { id: 2, name: 'Standard Component', sku: 'CMP-045', category: 'Electronics', quantity: 8, minQuantity: 25, price: 29.99 },
  { id: 3, name: 'Office Chair', sku: 'FUR-101', category: 'Furniture', quantity: 45, minQuantity: 10, price: 199.99 },
  { id: 4, name: 'Desk Lamp', sku: 'OFF-234', category: 'Office Supplies', quantity: 67, minQuantity: 15, price: 34.99 },
  { id: 5, name: 'Deluxe Assembly', sku: 'ASM-012', category: 'Tools', quantity: 3, minQuantity: 15, price: 149.99 },
  { id: 6, name: 'Basic Tool', sku: 'TL-234', category: 'Tools', quantity: 12, minQuantity: 30, price: 24.99 },
])

const formData = ref({
  name: '',
  sku: '',
  category: '',
  quantity: 0,
  minQuantity: 0,
  price: 0
})

const filteredItems = computed(() => {
  let result = items.value
  
  if (searchQuery.value) {
    result = result.filter(item => 
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (categoryFilter.value) {
    result = result.filter(item => item.category === categoryFilter.value)
  }
  
  return result
})

const getStockStatus = (item: InventoryItem) => {
  if (item.quantity <= item.minQuantity) return 'Low Stock'
  if (item.quantity <= item.minQuantity * 2) return 'Medium'
  return 'In Stock'
}

const editItem = (item: InventoryItem) => {
  editingItem.value = item
  formData.value = { ...item }
  isAddModalOpen.value = true
}

const deleteItem = (item: InventoryItem) => {
  if (confirm(`Are you sure you want to delete ${item.name}?`)) {
    items.value = items.value.filter(i => i.id !== item.id)
  }
}

const saveItem = () => {
  if (editingItem.value) {
    const index = items.value.findIndex(i => i.id === editingItem.value!.id)
    items.value[index] = { ...formData.value, id: editingItem.value.id }
  } else {
    items.value.push({
      ...formData.value,
      id: Math.max(...items.value.map(i => i.id)) + 1
    })
  }
  
  isAddModalOpen.value = false
  editingItem.value = null
  formData.value = { name: '', sku: '', category: '', quantity: 0, minQuantity: 0, price: 0 }
}
</script>
