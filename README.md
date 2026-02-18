# ERP System - Built with Nuxt.js

A comprehensive Enterprise Resource Planning (ERP) system built with Nuxt.js, featuring modern UI components and full-stack capabilities.

## Features

### 📊 Dashboard
- Real-time business metrics and KPIs
- Revenue, sales, inventory, and employee statistics
- Recent sales activity
- Low stock alerts

### 📦 Inventory Management
- Complete inventory tracking system
- Search and filter capabilities
- Stock level monitoring with alerts
- Add, edit, and delete inventory items
- Category-based organization

### 💰 Sales Management
- Sales order tracking
- Customer management
- Revenue analytics
- Order status management
- Sales performance metrics

### 🛒 Purchase Management
- Purchase order creation and tracking
- Supplier management
- Order status workflow
- Expected delivery tracking
- Purchase analytics

### 💵 Accounting & Finance
- Transaction management
- Invoice creation and tracking
- Profit & Loss statements
- Balance sheet summaries
- Financial reporting

### 👥 Human Resources
- Employee management
- Attendance tracking
- Leave management system
- Payroll calculations
- Department organization

## Technology Stack

- **Framework**: Nuxt.js 4.3.1
- **UI Library**: Nuxt UI (Tailwind CSS)
- **State Management**: Pinia
- **Database**: SQLite with Prisma ORM
- **Language**: TypeScript
- **Icons**: Heroicons

## Database

The ERP system uses **SQLite** with **Prisma ORM** for data persistence.

### Improved Database Schema (v2)

The schema has been significantly improved with normalization, type safety, and performance optimizations:

#### Core Tables
- **Customer**: Normalized customer data with contact info (replaces embedded customer data in Sales)
- **Supplier**: Normalized supplier data with contact info (replaces embedded supplier data in Purchases)
- **Category**: Product categories for better inventory organization
- **InventoryItem**: Product inventory with foreign key to Category
- **Sale**: Sales orders with foreign key to Customer, includes tax calculations
- **Purchase**: Purchase orders with foreign key to Supplier, includes delivery tracking
- **Employee**: HR employee records with phone numbers
- **Attendance**: Employee attendance with DateTime for check-in/out (improved from strings)
- **LeaveRequest**: Leave management with approval workflow tracking
- **Transaction**: Accounting transactions with reference numbers
- **Invoice**: Invoice management with payment tracking

#### Type Safety with Enums
- `SaleStatus`: Pending, Completed, Cancelled, Refunded
- `PurchaseStatus`: Pending, Approved, Ordered, Received, Cancelled
- `EmployeeStatus`: Active, OnLeave, Inactive
- `LeaveType`: SickLeave, Vacation, Personal, Unpaid
- `LeaveStatus`: Pending, Approved, Rejected
- `InvoiceStatus`: Draft, Pending, Paid, Overdue, Cancelled
- `TransactionType`: Income, Expense

#### Performance Features
- Indexes on frequently queried fields (emails, statuses, dates, SKU)
- Proper foreign key relationships with cascade deletes
- Unique constraints on business identifiers

### Database Commands
```bash
# Run migrations
npx prisma migrate dev

# Seed database with sample data
npm run db:seed

# Open Prisma Studio (database GUI)
npx prisma studio

# View schema
npx prisma db pull
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Nyantekyi/testero.git
cd testero
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build

## Project Structure

```
├── app/                # App configuration
├── components/         # Reusable Vue components
├── layouts/           # Layout templates
│   └── default.vue    # Main layout with navigation
├── pages/             # Application pages/routes
│   ├── index.vue      # Dashboard
│   ├── inventory.vue  # Inventory management
│   ├── sales.vue      # Sales management
│   ├── purchases.vue  # Purchase orders
│   ├── accounting.vue # Accounting & Finance
│   └── hr.vue         # Human Resources
├── public/            # Static assets
├── server/            # Server-side code
└── nuxt.config.ts     # Nuxt configuration
```

## Features in Detail

### Dashboard
The dashboard provides a comprehensive overview of your business with:
- Total revenue and sales metrics
- Inventory status with low stock warnings
- Employee count and recent activity
- Quick access to all modules

### Inventory Module
- Full CRUD operations for inventory items
- Real-time stock level monitoring
- Automatic low stock alerts
- Category-based filtering
- SKU management

### Sales Module
- Create and manage sales orders
- Track customer information
- Monitor sales status (Pending, Completed, Cancelled, Refunded)
- Calculate total revenue and average sale value

### Purchases Module
- Create purchase orders
- Manage supplier relationships
- Track order status from creation to receipt
- Monitor expected delivery dates

### Accounting Module
- Record income and expenses
- Create and manage invoices
- Generate financial reports
- View profit & loss statements
- Balance sheet summaries

### HR Module
- Manage employee records
- Track attendance
- Handle leave requests
- Calculate payroll
- Organize by departments

## API Endpoints

The system provides REST API endpoints for all modules with relationship data included:

### Customers (New)
- `GET /api/customers` - List all customers with their sales history
- `POST /api/customers` - Create new customer

### Suppliers (New)
- `GET /api/suppliers` - List all suppliers with their purchase orders
- `POST /api/suppliers` - Create new supplier

### Categories (New)
- `GET /api/categories` - List all categories with inventory items
- `POST /api/categories` - Create new category

### Inventory
- `GET /api/inventory` - List all inventory items (includes category data)
- `POST /api/inventory` - Create new inventory item
- `PUT /api/inventory/[id]` - Update inventory item
- `DELETE /api/inventory/[id]` - Delete inventory item

### Sales
- `GET /api/sales` - List all sales (includes customer data)
- `POST /api/sales` - Create new sale
- `PUT /api/sales/[id]` - Update sale

### Purchases
- `GET /api/purchases` - List all purchase orders (includes supplier data)
- `POST /api/purchases` - Create new purchase order
- `PUT /api/purchases/[id]` - Update purchase order

### Employees
- `GET /api/employees` - List all employees
- `POST /api/employees` - Create new employee
- `PUT /api/employees/[id]` - Update employee

### Transactions
- `GET /api/transactions` - List all accounting transactions
- `POST /api/transactions` - Create new transaction

### Invoices
- `GET /api/invoices` - List all invoices
- `POST /api/invoices` - Create new invoice

### API Response Examples

**Get Customers:**
```json
{
  "id": 1,
  "name": "Acme Corp",
  "email": "contact@acme.com",
  "phone": "555-0101",
  "address": "123 Business St, City, ST 12345",
  "sales": [
    {
      "id": 1,
      "product": "Premium Widget Pack",
      "amount": 2450.00,
      "tax": 196.00,
      "total": 2646.00,
      "status": "Completed"
    }
  ]
}
```

**Get Inventory with Categories:**
```json
{
  "id": 1,
  "name": "Premium Widget",
  "sku": "WGT-001",
  "quantity": 5,
  "minQuantity": 20,
  "price": 49.99,
  "category": {
    "id": 1,
    "name": "Electronics"
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.
