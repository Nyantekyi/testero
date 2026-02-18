import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Start seeding...')

  // Seed Categories
  const categories = [
    { name: 'Electronics', description: 'Electronic components and devices' },
    { name: 'Furniture', description: 'Office and home furniture' },
    { name: 'Office Supplies', description: 'General office supplies' },
    { name: 'Tools', description: 'Hand tools and equipment' },
    { name: 'Raw Materials', description: 'Raw materials for manufacturing' },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    })
  }
  console.log('✓ Categories seeded')

  // Seed Inventory Items
  const inventoryItems = [
    { name: 'Premium Widget', sku: 'WGT-001', categoryId: 1, quantity: 5, minQuantity: 20, price: 49.99, description: 'High-quality electronic widget' },
    { name: 'Standard Component', sku: 'CMP-045', categoryId: 1, quantity: 8, minQuantity: 25, price: 29.99, description: 'Standard electronic component' },
    { name: 'Office Chair', sku: 'FUR-101', categoryId: 2, quantity: 45, minQuantity: 10, price: 199.99, description: 'Ergonomic office chair' },
    { name: 'Desk Lamp', sku: 'OFF-234', categoryId: 3, quantity: 67, minQuantity: 15, price: 34.99, description: 'LED desk lamp' },
    { name: 'Deluxe Assembly', sku: 'ASM-012', categoryId: 4, quantity: 3, minQuantity: 15, price: 149.99, description: 'Professional assembly tool' },
    { name: 'Basic Tool', sku: 'TL-234', categoryId: 4, quantity: 12, minQuantity: 30, price: 24.99, description: 'Basic hand tool' },
  ]

  for (const item of inventoryItems) {
    await prisma.inventoryItem.upsert({
      where: { sku: item.sku },
      update: {},
      create: item,
    })
  }
  console.log('✓ Inventory items seeded')

  // Seed Customers
  const customers = [
    { name: 'Acme Corp', email: 'contact@acme.com', phone: '555-0101', address: '123 Business St, City, ST 12345' },
    { name: 'TechStart Inc', email: 'info@techstart.com', phone: '555-0102', address: '456 Tech Ave, City, ST 12346' },
    { name: 'Global Systems', email: 'sales@global.com', phone: '555-0103', address: '789 Global Blvd, City, ST 12347' },
    { name: 'SmallBiz LLC', email: 'owner@smallbiz.com', phone: '555-0104', address: '321 Small St, City, ST 12348' },
    { name: 'MegaCorp Industries', email: 'procurement@mega.com', phone: '555-0105', address: '654 Mega Way, City, ST 12349' },
  ]

  for (const customer of customers) {
    await prisma.customer.upsert({
      where: { email: customer.email },
      update: {},
      create: customer,
    })
  }
  console.log('✓ Customers seeded')

  // Seed Sales
  const sales = [
    { customerId: 1, product: 'Premium Widget Pack', amount: 2450.00, tax: 196.00, total: 2646.00, status: 'Completed', date: new Date('2024-02-15') },
    { customerId: 2, product: 'Standard Service', amount: 1200.00, tax: 96.00, total: 1296.00, status: 'Completed', date: new Date('2024-02-15') },
    { customerId: 3, product: 'Enterprise Package', amount: 5600.00, tax: 448.00, total: 6048.00, status: 'Pending', date: new Date('2024-02-16') },
    { customerId: 4, product: 'Starter Kit', amount: 450.00, tax: 36.00, total: 486.00, status: 'Completed', date: new Date('2024-02-17') },
    { customerId: 5, product: 'Bulk Order', amount: 8900.00, tax: 712.00, total: 9612.00, status: 'Pending', date: new Date('2024-02-17') },
  ]

  for (const sale of sales) {
    await prisma.sale.create({ data: sale })
  }
  console.log('✓ Sales seeded')

  // Seed Suppliers
  const suppliers = [
    { name: 'Parts Unlimited', email: 'sales@parts.com', phone: '555-0201', address: '111 Parts Lane, City, ST 12350' },
    { name: 'Office Depot', email: 'orders@depot.com', phone: '555-0202', address: '222 Office Rd, City, ST 12351' },
    { name: 'Tech Supplies Co', email: 'info@techsupply.com', phone: '555-0203', address: '333 Supply St, City, ST 12352' },
    { name: 'Industrial Tools Inc', email: 'sales@indtools.com', phone: '555-0204', address: '444 Industrial Dr, City, ST 12353' },
    { name: 'Raw Materials Ltd', email: 'orders@rawmat.com', phone: '555-0205', address: '555 Materials Way, City, ST 12354' },
  ]

  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      where: { email: supplier.email },
      update: {},
      create: supplier,
    })
  }
  console.log('✓ Suppliers seeded')

  // Seed Purchases
  const purchases = [
    { supplierId: 1, items: 'Electronic Components x100', amount: 3500.00, tax: 280.00, total: 3780.00, status: 'Ordered', orderDate: new Date('2024-02-10'), expectedDate: new Date('2024-02-25') },
    { supplierId: 2, items: 'Office Furniture', amount: 2800.00, tax: 224.00, total: 3024.00, status: 'Received', orderDate: new Date('2024-02-12'), expectedDate: new Date('2024-02-20'), receivedDate: new Date('2024-02-19') },
    { supplierId: 3, items: 'Computer Hardware', amount: 5600.00, tax: 448.00, total: 6048.00, status: 'Pending', orderDate: new Date('2024-02-15'), expectedDate: new Date('2024-03-01') },
    { supplierId: 4, items: 'Power Tools x20', amount: 1900.00, tax: 152.00, total: 2052.00, status: 'Approved', orderDate: new Date('2024-02-16'), expectedDate: new Date('2024-02-28') },
    { supplierId: 5, items: 'Raw Steel Sheets', amount: 7200.00, tax: 576.00, total: 7776.00, status: 'Ordered', orderDate: new Date('2024-02-17'), expectedDate: new Date('2024-03-05') },
  ]

  for (const purchase of purchases) {
    await prisma.purchase.create({ data: purchase })
  }
  console.log('✓ Purchases seeded')

  // Seed Employees
  const employees = [
    { name: 'John Smith', email: 'john.smith@company.com', phone: '555-1001', position: 'Software Engineer', department: 'Engineering', salary: 85000, hireDate: new Date('2023-01-15'), status: 'Active' },
    { name: 'Sarah Johnson', email: 'sarah.j@company.com', phone: '555-1002', position: 'Sales Manager', department: 'Sales', salary: 75000, hireDate: new Date('2022-06-01'), status: 'Active' },
    { name: 'Mike Davis', email: 'mike.d@company.com', phone: '555-1003', position: 'Marketing Specialist', department: 'Marketing', salary: 62000, hireDate: new Date('2023-03-10'), status: 'Active' },
    { name: 'Emily Brown', email: 'emily.b@company.com', phone: '555-1004', position: 'HR Coordinator', department: 'HR', salary: 58000, hireDate: new Date('2022-11-20'), status: 'OnLeave' },
    { name: 'David Wilson', email: 'david.w@company.com', phone: '555-1005', position: 'Finance Analyst', department: 'Finance', salary: 70000, hireDate: new Date('2023-02-05'), status: 'Active' },
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
    { description: 'Sales Revenue', type: 'Income', category: 'Revenue', amount: 5600, date: new Date('2024-02-17'), reference: 'INV-001' },
    { description: 'Office Rent', type: 'Expense', category: 'Rent', amount: 2500, date: new Date('2024-02-16'), reference: 'RENT-FEB' },
    { description: 'Equipment Purchase', type: 'Expense', category: 'Assets', amount: 3200, date: new Date('2024-02-15'), reference: 'PO-2001' },
    { description: 'Consulting Services', type: 'Income', category: 'Services', amount: 4500, date: new Date('2024-02-15'), reference: 'INV-002' },
    { description: 'Utilities', type: 'Expense', category: 'Utilities', amount: 450, date: new Date('2024-02-14'), reference: 'UTIL-FEB' },
  ]

  for (const transaction of transactions) {
    await prisma.transaction.create({ data: transaction })
  }
  console.log('✓ Transactions seeded')

  // Seed Invoices
  const invoices = [
    { invoiceNumber: 'INV-001', client: 'Acme Corp', description: 'Premium Widget Pack', amount: 2450.00, tax: 196.00, total: 2646.00, dueDate: new Date('2024-03-01'), status: 'Paid', paidDate: new Date('2024-02-20'), paymentMethod: 'Bank Transfer' },
    { invoiceNumber: 'INV-002', client: 'TechStart Inc', description: 'Standard Service', amount: 1200.00, tax: 96.00, total: 1296.00, dueDate: new Date('2024-02-25'), status: 'Pending' },
    { invoiceNumber: 'INV-003', client: 'Global Systems', description: 'Enterprise Package', amount: 5600.00, tax: 448.00, total: 6048.00, dueDate: new Date('2024-03-05'), status: 'Overdue' },
    { invoiceNumber: 'INV-004', client: 'SmallBiz LLC', description: 'Starter Kit', amount: 450.00, tax: 36.00, total: 486.00, dueDate: new Date('2024-02-28'), status: 'Pending' },
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
