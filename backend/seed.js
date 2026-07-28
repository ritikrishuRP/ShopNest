import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

dotenv.config();

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@shopnest.com',
    password: 'Admin@123',
    role: 'admin'
  },
  {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    password: 'Password123',
    role: 'user'
  },
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    password: 'Password123',
    role: 'user'
  },
  {
    name: 'Ava Williams',
    email: 'ava.williams@example.com',
    password: 'Password123',
    role: 'user'
  }
];

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'Comfortable wireless headphones with noise cancellation and long battery life.',
    price: 99.99,
    category: 'Electronics',
    stock: 50,
    imageUrl: 'https://example.com/images/wireless-headphones.jpg'
  },
  {
    name: 'Classic Leather Wallet',
    description: 'Premium genuine leather wallet with multiple card slots and bill compartments.',
    price: 39.99,
    category: 'Accessories',
    stock: 120,
    imageUrl: 'https://example.com/images/leather-wallet.jpg'
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Soft organic cotton t-shirt available in multiple colors and sizes.',
    price: 24.99,
    category: 'Apparel',
    stock: 80,
    imageUrl: 'https://example.com/images/cotton-tshirt.jpg'
  },
  {
    name: 'Smart Fitness Band',
    description: 'Track steps, heart rate, and sleep with this lightweight fitness band.',
    price: 49.99,
    category: 'Electronics',
    stock: 75,
    imageUrl: 'https://example.com/images/fitness-band.jpg'
  },
  {
    name: 'Running Shoes',
    description: 'Breathable running shoes with cushioned support for daily workouts.',
    price: 69.99,
    category: 'Footwear',
    stock: 60,
    imageUrl: 'https://example.com/images/running-shoes.jpg'
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle keeps drinks cold or hot for hours.',
    price: 19.99,
    category: 'Home & Kitchen',
    stock: 150,
    imageUrl: 'https://example.com/images/water-bottle.jpg'
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with clear sound and long battery life.',
    price: 59.99,
    category: 'Electronics',
    stock: 45,
    imageUrl: 'https://example.com/images/bluetooth-speaker.jpg'
  },
  {
    name: 'Gaming Mouse',
    description: 'High precision gaming mouse with customizable buttons and RGB lighting.',
    price: 34.99,
    category: 'Electronics',
    stock: 90,
    imageUrl: 'https://example.com/images/gaming-mouse.jpg'
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with comfortable cushioning for workouts and stretching.',
    price: 29.99,
    category: 'Fitness',
    stock: 100,
    imageUrl: 'https://example.com/images/yoga-mat.jpg'
  },
  {
    name: 'Desk Lamp',
    description: 'Adjustable LED desk lamp with touch controls and multiple brightness levels.',
    price: 27.99,
    category: 'Home & Office',
    stock: 70,
    imageUrl: 'https://example.com/images/desk-lamp.jpg'
  },
  {
    name: 'Travel Backpack',
    description: 'Durable travel backpack with separate laptop compartment and USB charging port.',
    price: 79.99,
    category: 'Bags',
    stock: 40,
    imageUrl: 'https://example.com/images/travel-backpack.jpg'
  },
  {
    name: 'Ceramic Coffee Mug',
    description: 'Stylish ceramic mug that is microwave and dishwasher safe.',
    price: 14.99,
    category: 'Home & Kitchen',
    stock: 130,
    imageUrl: 'https://example.com/images/coffee-mug.jpg'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = [];
    for (const user of sampleUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const createdUser = await User.create({
        ...user,
        password: hashedPassword
      });
      createdUsers.push(createdUser);
    }

    const createdProducts = await Product.insertMany(sampleProducts);

    const orders = [
      {
        user: createdUsers[1],
        items: [
          { product: createdProducts[0], qty: 1 },
          { product: createdProducts[3], qty: 1 }
        ],
        address: {
          fullName: 'Jane Doe',
          street: '456 Elm Street',
          city: 'Metropolis',
          postalCode: '54321',
          country: 'USA'
        },
        paymentId: 'TEST_PAYMENT_001'
      },
      {
        user: createdUsers[2],
        items: [
          { product: createdProducts[1], qty: 2 },
          { product: createdProducts[5], qty: 1 }
        ],
        address: {
          fullName: 'John Smith',
          street: '789 Oak Avenue',
          city: 'Gotham',
          postalCode: '67890',
          country: 'USA'
        },
        paymentId: 'TEST_PAYMENT_002'
      },
      {
        user: createdUsers[3],
        items: [
          { product: createdProducts[2], qty: 3 },
          { product: createdProducts[10], qty: 1 }
        ],
        address: {
          fullName: 'Ava Williams',
          street: '123 Pine Road',
          city: 'Star City',
          postalCode: '11223',
          country: 'USA'
        },
        paymentId: 'TEST_PAYMENT_003'
      }
    ];

    for (const orderData of orders) {
      const orderItems = orderData.items.map((item) => ({
        productId: item.product._id,
        qty: item.qty,
        price: item.product.price
      }));

      await Order.create({
        userId: orderData.user._id,
        items: orderItems,
        totalAmount: orderItems.reduce((sum, item) => sum + item.price * item.qty, 0),
        address: orderData.address,
        paymentId: orderData.paymentId
      });
    }

    console.log('Seed data created successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();
