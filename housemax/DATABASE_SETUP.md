# Database Setup Guide for HouseMax

This guide will help you set up the PostgreSQL database for the HouseMax e-commerce application.

## Prerequisites

1. **PostgreSQL Server**: Make sure PostgreSQL is installed and running on your system
2. **Node.js**: Ensure Node.js is installed (version 18 or higher recommended)

## Step 1: Install PostgreSQL

### Windows
1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer and follow the setup wizard
3. Remember the password you set for the `postgres` user
4. Make sure PostgreSQL service is running

### macOS
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## Step 2: Create Database

1. Open PostgreSQL command line or pgAdmin
2. Create a new database:

```sql
-- Connect to PostgreSQL as postgres user
psql -U postgres

-- Create database
CREATE DATABASE housemax_db;

-- Create a user (optional, you can use postgres user)
CREATE USER housemax_user WITH PASSWORD 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE housemax_db TO housemax_user;

-- Exit
\q
```

## Step 3: Environment Configuration

1. Create a `.env` file in the `housemax` directory:

```bash
# Database
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/housemax_db?schema=public"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Stripe (optional)
STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""

# UploadThing (optional)
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""

# Resend (optional)
RESEND_API_KEY=""
```

2. Replace the following values:
   - `your_password`: Your PostgreSQL password
   - `your-secret-key-here`: A random secret key for NextAuth.js

## Step 4: Database Setup

Run the automated setup script:

```bash
cd housemax
npm run db:setup
```

This script will:
- Generate the Prisma client
- Push the database schema
- Seed the database with initial data

## Step 5: Verify Setup

1. **Check database connection**:
   ```bash
   npm run db:studio
   ```
   This opens Prisma Studio where you can view and manage your data.

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Visit the application**: Open [http://localhost:3000](http://localhost:3000)

## Database Schema Overview

The database includes the following tables:

### Core Tables
- **Users**: Customer and admin accounts
- **Categories**: Product categories with hierarchical support
- **Products**: Product catalog with pricing and inventory
- **Orders**: Customer orders with status tracking
- **OrderItems**: Individual items within orders
- **Reviews**: Product reviews and ratings
- **Cart**: Shopping cart for users
- **CartItems**: Items in shopping carts

### Key Features
- **User Roles**: Admin and regular user roles
- **Order Status**: Pending, Paid, Shipped, Delivered, Cancelled, Refunded
- **Hierarchical Categories**: Support for parent-child category relationships
- **Inventory Management**: Stock tracking for products
- **Review System**: Product ratings and comments

## Available Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Seed database with sample data
npm run db:seed

# Open Prisma Studio
npm run db:studio

# Reset database (WARNING: This will delete all data)
npm run db:reset

# Run the complete setup
npm run db:setup
```

## Troubleshooting

### Common Issues

1. **Connection refused**:
   - Ensure PostgreSQL is running
   - Check the DATABASE_URL format
   - Verify username and password

2. **Permission denied**:
   - Make sure the database user has proper privileges
   - Check if the database exists

3. **Schema errors**:
   - Run `npm run db:generate` to regenerate the Prisma client
   - Use `npm run db:push` to sync schema changes

### Getting Help

- Check the [Prisma documentation](https://www.prisma.io/docs)
- Verify your PostgreSQL installation
- Ensure all environment variables are set correctly

## Sample Data

The seed script creates:
- 5 product categories (Electronics, Furniture, Home Decor, Kitchen, Bedroom)
- 10 sample products with realistic pricing
- 1 admin user (admin@housemax.com)
- 1 sample customer (customer@example.com)
- 3 sample product reviews

## Security Notes

- Never commit your `.env` file to version control
- Use strong passwords for database users
- Generate secure NEXTAUTH_SECRET keys
- In production, use environment-specific database URLs
