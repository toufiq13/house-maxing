#!/usr/bin/env node

/**
 * Database Setup Script for HouseMax
 * 
 * This script helps set up the PostgreSQL database for the HouseMax application.
 * Run this script after setting up your PostgreSQL server and environment variables.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏠 HouseMax Database Setup');
console.log('========================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('📝 Please create a .env file in the housemax directory with the following content:\n');
  
  const envContent = `# Database
DATABASE_URL="postgresql://username:password@localhost:5432/housemax_db?schema=public"

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
RESEND_API_KEY=""`;

  console.log(envContent);
  console.log('\n⚠️  Replace the DATABASE_URL with your actual PostgreSQL connection string.');
  console.log('   Example: postgresql://postgres:password@localhost:5432/housemax_db?schema=public');
  process.exit(1);
}

console.log('✅ .env file found');

try {
  // Generate Prisma client
  console.log('\n🔄 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  console.log('✅ Prisma client generated');

  // Push database schema
  console.log('\n🔄 Pushing database schema...');
  execSync('npx prisma db push', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  console.log('✅ Database schema pushed');

  // Seed database (if seed script exists)
  try {
    console.log('\n🔄 Seeding database...');
    execSync('npx prisma db seed', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log('✅ Database seeded');
  } catch (error) {
    console.log('⚠️  No seed script found or seeding failed (this is optional)');
  }

  console.log('\n🎉 Database setup completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('   1. Start your development server: npm run dev');
  console.log('   2. Open Prisma Studio: npx prisma studio');
  console.log('   3. Visit http://localhost:3000 to see your application');

} catch (error) {
  console.error('\n❌ Database setup failed:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('   1. Make sure PostgreSQL is running');
  console.log('   2. Check your DATABASE_URL in .env file');
  console.log('   3. Ensure the database exists');
  console.log('   4. Check your PostgreSQL user permissions');
  process.exit(1);
}
