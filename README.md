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

### Database Schema
- **InventoryItem**: Product inventory with SKU, pricing, and stock levels
- **Sale**: Sales orders with customer information
- **Purchase**: Purchase orders with supplier management
- **Employee**: HR employee records
- **Attendance**: Employee attendance tracking
- **LeaveRequest**: Leave request management
- **Transaction**: Accounting transactions (income/expense)
- **Invoice**: Invoice management

### Database Commands
```bash
# Run migrations
npx prisma migrate dev

# Seed database with sample data
npm run db:seed

# Open Prisma Studio (database GUI)
npx prisma studio
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

The system provides REST API endpoints for all modules:

### Inventory
- `GET /api/inventory` - List all inventory items
- `POST /api/inventory` - Create new inventory item
- `PUT /api/inventory/[id]` - Update inventory item
- `DELETE /api/inventory/[id]` - Delete inventory item

### Sales
- `GET /api/sales` - List all sales
- `POST /api/sales` - Create new sale
- `PUT /api/sales/[id]` - Update sale

### Purchases
- `GET /api/purchases` - List all purchase orders
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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.
