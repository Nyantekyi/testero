<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
    
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500">Total Revenue</h3>
            <UIcon name="i-heroicons-currency-dollar" class="h-5 w-5 text-green-500" />
          </div>
        </template>
        <p class="text-2xl font-semibold text-gray-900">${{ formatNumber(stats.totalRevenue) }}</p>
        <p class="text-sm text-green-600 mt-2">+12.5% from last month</p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500">Total Sales</h3>
            <UIcon name="i-heroicons-shopping-cart" class="h-5 w-5 text-blue-500" />
          </div>
        </template>
        <p class="text-2xl font-semibold text-gray-900">{{ formatNumber(stats.totalSales) }}</p>
        <p class="text-sm text-green-600 mt-2">+8.2% from last month</p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500">Inventory Items</h3>
            <UIcon name="i-heroicons-cube" class="h-5 w-5 text-purple-500" />
          </div>
        </template>
        <p class="text-2xl font-semibold text-gray-900">{{ formatNumber(stats.inventoryItems) }}</p>
        <p class="text-sm text-gray-600 mt-2">{{ stats.lowStockItems }} items low stock</p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500">Employees</h3>
            <UIcon name="i-heroicons-users" class="h-5 w-5 text-orange-500" />
          </div>
        </template>
        <p class="text-2xl font-semibold text-gray-900">{{ formatNumber(stats.totalEmployees) }}</p>
        <p class="text-sm text-green-600 mt-2">+3 new this month</p>
      </UCard>
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Sales -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900">Recent Sales</h3>
        </template>
        <div class="space-y-4">
          <div v-for="sale in recentSales" :key="sale.id" class="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
            <div>
              <p class="font-medium text-gray-900">{{ sale.customer }}</p>
              <p class="text-sm text-gray-500">{{ sale.product }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">${{ formatNumber(sale.amount) }}</p>
              <p class="text-sm text-gray-500">{{ sale.date }}</p>
            </div>
          </div>
        </div>
        <template #footer>
          <NuxtLink to="/sales" class="text-primary-600 hover:text-primary-800 text-sm font-medium">
            View all sales →
          </NuxtLink>
        </template>
      </UCard>

      <!-- Low Stock Alerts -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900">Low Stock Alerts</h3>
        </template>
        <div class="space-y-4">
          <div v-for="item in lowStockItems" :key="item.id" class="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
            <div>
              <p class="font-medium text-gray-900">{{ item.name }}</p>
              <p class="text-sm text-gray-500">SKU: {{ item.sku }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-red-600">{{ item.quantity }} units</p>
              <p class="text-sm text-gray-500">Min: {{ item.minQuantity }}</p>
            </div>
          </div>
        </div>
        <template #footer>
          <NuxtLink to="/inventory" class="text-primary-600 hover:text-primary-800 text-sm font-medium">
            View inventory →
          </NuxtLink>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const stats = ref({
  totalRevenue: 125430.50,
  totalSales: 1243,
  inventoryItems: 342,
  lowStockItems: 12,
  totalEmployees: 48
})

const recentSales = ref([
  { id: 1, customer: 'Acme Corp', product: 'Premium Widget Pack', amount: 2450.00, date: '2 hours ago' },
  { id: 2, customer: 'TechStart Inc', product: 'Standard Service', amount: 1200.00, date: '4 hours ago' },
  { id: 3, customer: 'Global Systems', product: 'Enterprise Package', amount: 5600.00, date: '5 hours ago' },
  { id: 4, customer: 'SmallBiz LLC', product: 'Starter Kit', amount: 450.00, date: '1 day ago' },
])

const lowStockItems = ref([
  { id: 1, name: 'Premium Widget', sku: 'WGT-001', quantity: 5, minQuantity: 20 },
  { id: 2, name: 'Standard Component', sku: 'CMP-045', quantity: 8, minQuantity: 25 },
  { id: 3, name: 'Deluxe Assembly', sku: 'ASM-012', quantity: 3, minQuantity: 15 },
  { id: 4, name: 'Basic Tool', sku: 'TL-234', quantity: 12, minQuantity: 30 },
])

const formatNumber = (num: number) => {
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>
