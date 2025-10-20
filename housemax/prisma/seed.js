const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create categories
  console.log('📂 Creating categories...');
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'electronics' },
      update: {},
      create: {
        name: 'Electronics',
        slug: 'electronics',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'furniture' },
      update: {},
      create: {
        name: 'Furniture',
        slug: 'furniture',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'home-decor' },
      update: {},
      create: {
        name: 'Home Decor',
        slug: 'home-decor',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'kitchen' },
      update: {},
      create: {
        name: 'Kitchen & Dining',
        slug: 'kitchen',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'bedroom' },
      update: {},
      create: {
        name: 'Bedroom',
        slug: 'bedroom',
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create products
  console.log('🛍️ Creating products...');
  const products = await Promise.all([
    // Electronics
    prisma.product.upsert({
      where: { slug: 'smart-tv-55-inch' },
      update: {},
      create: {
        name: 'Smart TV 55 Inch',
        slug: 'smart-tv-55-inch',
        description: '4K Ultra HD Smart TV with built-in streaming apps and voice control.',
        price: 599.99,
        stock: 25,
        imageUrl: '/images/smart-tv.jpg',
        categoryId: categories[0].id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'wireless-speaker' },
      update: {},
      create: {
        name: 'Wireless Bluetooth Speaker',
        slug: 'wireless-speaker',
        description: 'High-quality wireless speaker with 12-hour battery life.',
        price: 89.99,
        stock: 50,
        imageUrl: '/images/speaker.jpg',
        categoryId: categories[0].id,
      },
    }),

    // Furniture
    prisma.product.upsert({
      where: { slug: 'modern-sofa' },
      update: {},
      create: {
        name: 'Modern 3-Seater Sofa',
        slug: 'modern-sofa',
        description: 'Comfortable modern sofa with premium fabric upholstery.',
        price: 799.99,
        stock: 15,
        imageUrl: '/images/sofa.jpg',
        categoryId: categories[1].id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'dining-table-set' },
      update: {},
      create: {
        name: 'Dining Table Set (6 chairs)',
        slug: 'dining-table-set',
        description: 'Solid wood dining table with 6 matching chairs.',
        price: 1299.99,
        stock: 8,
        imageUrl: '/images/dining-set.jpg',
        categoryId: categories[1].id,
      },
    }),

    // Home Decor
    prisma.product.upsert({
      where: { slug: 'wall-art-set' },
      update: {},
      create: {
        name: 'Modern Wall Art Set',
        slug: 'wall-art-set',
        description: 'Set of 3 modern abstract wall art pieces.',
        price: 149.99,
        stock: 30,
        imageUrl: '/images/wall-art.jpg',
        categoryId: categories[2].id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'floor-lamp' },
      update: {},
      create: {
        name: 'Modern Floor Lamp',
        slug: 'floor-lamp',
        description: 'Adjustable floor lamp with LED lighting.',
        price: 199.99,
        stock: 20,
        imageUrl: '/images/floor-lamp.jpg',
        categoryId: categories[2].id,
      },
    }),

    // Kitchen
    prisma.product.upsert({
      where: { slug: 'coffee-maker' },
      update: {},
      create: {
        name: 'Premium Coffee Maker',
        slug: 'coffee-maker',
        description: 'Programmable coffee maker with built-in grinder.',
        price: 299.99,
        stock: 35,
        imageUrl: '/images/coffee-maker.jpg',
        categoryId: categories[3].id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'kitchen-knife-set' },
      update: {},
      create: {
        name: 'Professional Knife Set',
        slug: 'kitchen-knife-set',
        description: 'Set of 8 professional-grade kitchen knives.',
        price: 179.99,
        stock: 40,
        imageUrl: '/images/knife-set.jpg',
        categoryId: categories[3].id,
      },
    }),

    // Bedroom
    prisma.product.upsert({
      where: { slug: 'memory-foam-mattress' },
      update: {},
      create: {
        name: 'Memory Foam Mattress',
        slug: 'memory-foam-mattress',
        description: 'Queen size memory foam mattress with cooling gel.',
        price: 899.99,
        stock: 12,
        imageUrl: '/images/mattress.jpg',
        categoryId: categories[4].id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'bedroom-dresser' },
      update: {},
      create: {
        name: '6-Drawer Bedroom Dresser',
        slug: 'bedroom-dresser',
        description: 'Solid wood dresser with 6 spacious drawers.',
        price: 649.99,
        stock: 10,
        imageUrl: '/images/dresser.jpg',
        categoryId: categories[4].id,
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  // Create admin user
  console.log('👤 Creating admin user...');
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@housemax.com' },
    update: {},
    create: {
      email: 'admin@housemax.com',
      name: 'Admin User',
      role: 'ADMIN',
      // Note: In production, you should hash the password properly
      passwordHash: 'hashed_password_here', // Replace with actual hashed password
    },
  });

  console.log('✅ Created admin user');

  // Create sample customer
  console.log('👤 Creating sample customer...');
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      name: 'John Doe',
      role: 'USER',
      passwordHash: 'hashed_password_here', // Replace with actual hashed password
    },
  });

  console.log('✅ Created sample customer');

  // Create sample reviews
  console.log('⭐ Creating sample reviews...');
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment: 'Excellent product! Highly recommended.',
        userId: customer.id,
        productId: products[0].id, // Smart TV
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: 'Good quality, fast delivery.',
        userId: customer.id,
        productId: products[2].id, // Modern Sofa
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: 'Perfect addition to my home!',
        userId: customer.id,
        productId: products[4].id, // Wall Art Set
      },
    }),
  ]);

  console.log(`✅ Created ${reviews.length} reviews`);

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - Categories: ${categories.length}`);
  console.log(`   - Products: ${products.length}`);
  console.log(`   - Users: 2 (1 admin, 1 customer)`);
  console.log(`   - Reviews: ${reviews.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
