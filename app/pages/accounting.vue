<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Accounting & Finance</h1>

    <!-- Financial Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Revenue</p>
            <p class="text-2xl font-bold text-green-600">${{ formatNumber(financials.revenue) }}</p>
          </div>
          <UIcon name="i-heroicons-arrow-trending-up" class="h-8 w-8 text-green-500" />
        </div>
      </UCard>
      
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Expenses</p>
            <p class="text-2xl font-bold text-red-600">${{ formatNumber(financials.expenses) }}</p>
          </div>
          <UIcon name="i-heroicons-arrow-trending-down" class="h-8 w-8 text-red-500" />
        </div>
      </UCard>
      
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Net Profit</p>
            <p class="text-2xl font-bold text-blue-600">${{ formatNumber(financials.profit) }}</p>
          </div>
          <UIcon name="i-heroicons-chart-bar" class="h-8 w-8 text-blue-500" />
        </div>
      </UCard>
      
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Profit Margin</p>
            <p class="text-2xl font-bold text-purple-600">{{ profitMargin }}%</p>
          </div>
          <UIcon name="i-heroicons-calculator" class="h-8 w-8 text-purple-500" />
        </div>
      </UCard>
    </div>

    <!-- Tabs for different sections -->
    <UTabs :items="tabs" class="mb-6">
      <template #transactions>
        <div class="mt-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Recent Transactions</h2>
            <UButton icon="i-heroicons-plus" size="sm" @click="isAddTransactionOpen = true">
              Add Transaction
            </UButton>
          </div>
          
          <UCard>
            <UTable :columns="transactionColumns" :rows="transactions">
              <template #amount-data="{ row }">
                <span :class="row.type === 'income' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">
                  {{ row.type === 'income' ? '+' : '-' }}${{ Math.abs(row.amount).toFixed(2) }}
                </span>
              </template>
              
              <template #type-data="{ row }">
                <UBadge :color="row.type === 'income' ? 'green' : 'red'">
                  {{ row.type }}
                </UBadge>
              </template>
            </UTable>
          </UCard>
        </div>
      </template>

      <template #invoices>
        <div class="mt-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Invoices</h2>
            <UButton icon="i-heroicons-plus" size="sm" @click="isAddInvoiceOpen = true">
              Create Invoice
            </UButton>
          </div>
          
          <UCard>
            <UTable :columns="invoiceColumns" :rows="invoices">
              <template #amount-data="{ row }">
                <span class="font-semibold">${{ row.amount.toFixed(2) }}</span>
              </template>
              
              <template #status-data="{ row }">
                <UBadge :color="getInvoiceStatusColor(row.status)">
                  {{ row.status }}
                </UBadge>
              </template>
              
              <template #actions-data="{ row }">
                <UButton icon="i-heroicons-eye" size="xs" variant="ghost" @click="viewInvoice(row)" />
              </template>
            </UTable>
          </UCard>
        </div>
      </template>

      <template #reports>
        <div class="mt-6">
          <h2 class="text-xl font-semibold mb-4">Financial Reports</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UCard>
              <template #header>
                <h3 class="font-semibold">Profit & Loss Statement</h3>
              </template>
              <div class="space-y-3">
                <div class="flex justify-between py-2 border-b">
                  <span class="text-gray-600">Total Revenue</span>
                  <span class="font-semibold text-green-600">${{ formatNumber(financials.revenue) }}</span>
                </div>
                <div class="flex justify-between py-2 border-b">
                  <span class="text-gray-600">Total Expenses</span>
                  <span class="font-semibold text-red-600">${{ formatNumber(financials.expenses) }}</span>
                </div>
                <div class="flex justify-between py-2 border-t-2">
                  <span class="font-semibold">Net Profit</span>
                  <span class="font-bold text-blue-600">${{ formatNumber(financials.profit) }}</span>
                </div>
              </div>
            </UCard>

            <UCard>
              <template #header>
                <h3 class="font-semibold">Balance Sheet Summary</h3>
              </template>
              <div class="space-y-3">
                <div class="flex justify-between py-2 border-b">
                  <span class="text-gray-600">Assets</span>
                  <span class="font-semibold">${{ formatNumber(245600) }}</span>
                </div>
                <div class="flex justify-between py-2 border-b">
                  <span class="text-gray-600">Liabilities</span>
                  <span class="font-semibold">${{ formatNumber(89200) }}</span>
                </div>
                <div class="flex justify-between py-2 border-t-2">
                  <span class="font-semibold">Equity</span>
                  <span class="font-bold text-blue-600">${{ formatNumber(156400) }}</span>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </template>
    </UTabs>

    <!-- Add Transaction Modal -->
    <UModal v-model="isAddTransactionOpen" title="Add Transaction">
      <UForm :state="transactionForm" class="space-y-4 p-4">
        <UFormGroup label="Description" name="description" required>
          <UInput v-model="transactionForm.description" />
        </UFormGroup>
        
        <UFormGroup label="Type" name="type" required>
          <USelect v-model="transactionForm.type" :options="['income', 'expense']" />
        </UFormGroup>
        
        <UFormGroup label="Category" name="category" required>
          <UInput v-model="transactionForm.category" />
        </UFormGroup>
        
        <UFormGroup label="Amount" name="amount" required>
          <UInput v-model.number="transactionForm.amount" type="number" step="0.01" />
        </UFormGroup>
        
        <UFormGroup label="Date" name="date" required>
          <UInput v-model="transactionForm.date" type="date" />
        </UFormGroup>

        <div class="flex justify-end gap-2 pt-4">
          <UButton color="gray" variant="ghost" @click="isAddTransactionOpen = false">Cancel</UButton>
          <UButton @click="addTransaction">Add Transaction</UButton>
        </div>
      </UForm>
    </UModal>

    <!-- Add Invoice Modal -->
    <UModal v-model="isAddInvoiceOpen" title="Create Invoice">
      <UForm :state="invoiceForm" class="space-y-4 p-4">
        <UFormGroup label="Client" name="client" required>
          <UInput v-model="invoiceForm.client" />
        </UFormGroup>
        
        <UFormGroup label="Description" name="description" required>
          <UTextarea v-model="invoiceForm.description" />
        </UFormGroup>
        
        <UFormGroup label="Amount" name="amount" required>
          <UInput v-model.number="invoiceForm.amount" type="number" step="0.01" />
        </UFormGroup>
        
        <UFormGroup label="Due Date" name="dueDate" required>
          <UInput v-model="invoiceForm.dueDate" type="date" />
        </UFormGroup>

        <div class="flex justify-end gap-2 pt-4">
          <UButton color="gray" variant="ghost" @click="isAddInvoiceOpen = false">Cancel</UButton>
          <UButton @click="createInvoice">Create Invoice</UButton>
        </div>
      </UForm>
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const isAddTransactionOpen = ref(false)
const isAddInvoiceOpen = ref(false)

const tabs = [
  { label: 'Transactions', slot: 'transactions', icon: 'i-heroicons-arrows-right-left' },
  { label: 'Invoices', slot: 'invoices', icon: 'i-heroicons-document-text' },
  { label: 'Reports', slot: 'reports', icon: 'i-heroicons-chart-bar-square' }
]

const financials = ref({
  revenue: 125430.50,
  expenses: 78240.30,
  profit: 47190.20
})

const profitMargin = computed(() => {
  return ((financials.value.profit / financials.value.revenue) * 100).toFixed(1)
})

const transactionColumns = [
  { key: 'date', label: 'Date' },
  { key: 'description', label: 'Description' },
  { key: 'category', label: 'Category' },
  { key: 'type', label: 'Type' },
  { key: 'amount', label: 'Amount' }
]

const transactions = ref([
  { id: 1, date: '2024-02-17', description: 'Sales Revenue', category: 'Income', type: 'income', amount: 5600 },
  { id: 2, date: '2024-02-16', description: 'Office Rent', category: 'Rent', type: 'expense', amount: 2500 },
  { id: 3, date: '2024-02-15', description: 'Equipment Purchase', category: 'Assets', type: 'expense', amount: 3200 },
  { id: 4, date: '2024-02-15', description: 'Consulting Services', category: 'Income', type: 'income', amount: 4500 },
  { id: 5, date: '2024-02-14', description: 'Utilities', category: 'Utilities', type: 'expense', amount: 450 },
])

const invoiceColumns = [
  { key: 'invoiceNumber', label: 'Invoice #' },
  { key: 'client', label: 'Client' },
  { key: 'amount', label: 'Amount' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
]

const invoices = ref([
  { id: 1, invoiceNumber: 'INV-001', client: 'Acme Corp', amount: 2450.00, dueDate: '2024-03-01', status: 'Paid' },
  { id: 2, invoiceNumber: 'INV-002', client: 'TechStart Inc', amount: 1200.00, dueDate: '2024-02-25', status: 'Pending' },
  { id: 3, invoiceNumber: 'INV-003', client: 'Global Systems', amount: 5600.00, dueDate: '2024-03-05', status: 'Overdue' },
  { id: 4, invoiceNumber: 'INV-004', client: 'SmallBiz LLC', amount: 450.00, dueDate: '2024-02-28', status: 'Pending' },
])

const transactionForm = ref({
  description: '',
  type: 'income',
  category: '',
  amount: 0,
  date: new Date().toISOString().split('T')[0]
})

const invoiceForm = ref({
  client: '',
  description: '',
  amount: 0,
  dueDate: ''
})

const formatNumber = (num: number) => {
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const getInvoiceStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'Paid': 'green',
    'Pending': 'yellow',
    'Overdue': 'red'
  }
  return colors[status] || 'gray'
}

const viewInvoice = (invoice: any) => {
  alert(`Viewing ${invoice.invoiceNumber}\nClient: ${invoice.client}\nAmount: $${invoice.amount}`)
}

const addTransaction = () => {
  transactions.value.unshift({
    id: Math.max(...transactions.value.map(t => t.id)) + 1,
    ...transactionForm.value
  })
  isAddTransactionOpen.value = false
  transactionForm.value = { description: '', type: 'income', category: '', amount: 0, date: new Date().toISOString().split('T')[0] }
}

const createInvoice = () => {
  invoices.value.unshift({
    id: Math.max(...invoices.value.map(i => i.id)) + 1,
    invoiceNumber: `INV-${String(invoices.value.length + 1).padStart(3, '0')}`,
    ...invoiceForm.value,
    status: 'Pending'
  })
  isAddInvoiceOpen.value = false
  invoiceForm.value = { client: '', description: '', amount: 0, dueDate: '' }
}
</script>
