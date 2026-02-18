import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Start seeding...')

  // Seed Inventory Items
  const inventoryItems = [
    { name: 'Premium Widget', sku: 'WGT-001', category: 'Electronics', quantity: 5, minQuantity: 20, price: 49.99 },
    { name: 'Standard Component', sku: 'CMP-045', category: 'Electronics', quantity: 8, minQuantity: 25, price: 29.99 },
    { name: 'Office Chair', sku: 'FUR-101', category: 'Furniture', quantity: 45, minQuantity: 10, price: 199.99 },
    { name: 'Desk Lamp', sku: 'OFF-234', category: 'Office Supplies', quantity: 67, minQuantity: 15, price: 34.99 },
    { name: 'Deluxe Assembly', sku: 'ASM-012', category: 'Tools', quantity: 3, minQuantity: 15, price: 149.99 },
    { name: 'Basic Tool', sku: 'TL-234', category: 'Tools', quantity: 12, minQuantity: 30, price: 24.99 },
  ]

  for (const item of inventoryItems) {
    await prisma.inventoryItem.upsert({
      where: { sku: item.sku },
      update: {},
      create: item,
    })
  }
  console.log('✓ Inventory items seeded')

  // Seed Sales
  const sales = [
    { customer: 'Acme Corp', email: 'contact@acme.com', product: 'Premium Widget Pack', amount: 2450.00, status: 'Completed', date: new Date('2024-02-15') },
    { customer: 'TechStart Inc', email: 'info@techstart.com', product: 'Standard Service', amount: 1200.00, status: 'Completed', date: new Date('2024-02-15') },
    { customer: 'Global Systems', email: 'sales@global.com', product: 'Enterprise Package', amount: 5600.00, status: 'Pending', date: new Date('2024-02-16') },
    { customer: 'SmallBiz LLC', email: 'owner@smallbiz.com', product: 'Starter Kit', amount: 450.00, status: 'Completed', date: new Date('2024-02-17') },
    { customer: 'MegaCorp Industries', email: 'procurement@mega.com', product: 'Bulk Order', amount: 8900.00, status: 'Pending', date: new Date('2024-02-17') },
  ]

  for (const sale of sales) {
    await prisma.sale.create({ data: sale })
  }
  console.log('✓ Sales seeded')

  // Seed Purchases
  const purchases = [
    { supplier: 'Parts Unlimited', email: 'sales@parts.com', items: 'Electronic Components x100', amount: 3500.00, status: 'Ordered', orderDate: new Date('2024-02-10'), expectedDate: new Date('2024-02-25') },
    { supplier: 'Office Depot', email: 'orders@depot.com', items: 'Office Furniture', amount: 2800.00, status: 'Received', orderDate: new Date('2024-02-12'), expectedDate: new Date('2024-02-20') },
    { supplier: 'Tech Supplies Co', email: 'info@techsupply.com', items: 'Computer Hardware', amount: 5600.00, status: 'Pending', orderDate: new Date('2024-02-15'), expectedDate: new Date('2024-03-01') },
    { supplier: 'Industrial Tools Inc', email: 'sales@indtools.com', items: 'Power Tools x20', amount: 1900.00, status: 'Approved', orderDate: new Date('2024-02-16'), expectedDate: new Date('2024-02-28') },
    { supplier: 'Raw Materials Ltd', email: 'orders@rawmat.com', items: 'Raw Steel Sheets', amount: 7200.00, status: 'Ordered', orderDate: new Date('2024-02-17'), expectedDate: new Date('2024-03-05') },
  ]

  for (const purchase of purchases) {
    await prisma.purchase.create({ data: purchase })
  }
  console.log('✓ Purchases seeded')

  // Seed Employees
  const employees = [
    { name: 'John Smith', email: 'john.smith@company.com', position: 'Software Engineer', department: 'Engineering', salary: 85000, hireDate: new Date('2023-01-15'), status: 'Active' },
    { name: 'Sarah Johnson', email: 'sarah.j@company.com', position: 'Sales Manager', department: 'Sales', salary: 75000, hireDate: new Date('2022-06-01'), status: 'Active' },
    { name: 'Mike Davis', email: 'mike.d@company.com', position: 'Marketing Specialist', department: 'Marketing', salary: 62000, hireDate: new Date('2023-03-10'), status: 'Active' },
    { name: 'Emily Brown', email: 'emily.b@company.com', position: 'HR Coordinator', department: 'HR', salary: 58000, hireDate: new Date('2022-11-20'), status: 'On Leave' },
    { name: 'David Wilson', email: 'david.w@company.com', position: 'Finance Analyst', department: 'Finance', salary: 70000, hireDate: new Date('2023-02-05'), status: 'Active' },
  ]

  for (const employee of employees) {
    await prisma.employee.upsert({
      where: { email: employee.email },
      update: {},
      create: employee,
    })
  }
  console.log('✓ Employees seeded')

  // Seed Transactions
  const transactions = [
    { description: 'Sales Revenue', type: 'income', category: 'Income', amount: 5600, date: new Date('2024-02-17') },
    { description: 'Office Rent', type: 'expense', category: 'Rent', amount: 2500, date: new Date('2024-02-16') },
    { description: 'Equipment Purchase', type: 'expense', category: 'Assets', amount: 3200, date: new Date('2024-02-15') },
    { description: 'Consulting Services', type: 'income', category: 'Income', amount: 4500, date: new Date('2024-02-15') },
    { description: 'Utilities', type: 'expense', category: 'Utilities', amount: 450, date: new Date('2024-02-14') },
  ]

  for (const transaction of transactions) {
    await prisma.transaction.create({ data: transaction })
  }
  console.log('✓ Transactions seeded')

  // Seed Invoices
  const invoices = [
    { invoiceNumber: 'INV-001', client: 'Acme Corp', description: 'Premium Widget Pack', amount: 2450.00, dueDate: new Date('2024-03-01'), status: 'Paid' },
    { invoiceNumber: 'INV-002', client: 'TechStart Inc', description: 'Standard Service', amount: 1200.00, dueDate: new Date('2024-02-25'), status: 'Pending' },
    { invoiceNumber: 'INV-003', client: 'Global Systems', description: 'Enterprise Package', amount: 5600.00, dueDate: new Date('2024-03-05'), status: 'Overdue' },
    { invoiceNumber: 'INV-004', client: 'SmallBiz LLC', description: 'Starter Kit', amount: 450.00, dueDate: new Date('2024-02-28'), status: 'Pending' },
  ]

  for (const invoice of invoices) {
    await prisma.invoice.upsert({
      where: { invoiceNumber: invoice.invoiceNumber },
      update: {},
      create: invoice,
    })
  }
  console.log('✓ Invoices seeded')

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
