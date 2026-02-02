/**
 * Seed Admin User Script
 * 
 * Creates an admin user in the database
 * 
 * Usage:
 *   npm run seed:admin
 *   
 * Or with custom credentials:
 *   ADMIN_EMAIL=your@email.com ADMIN_PASSWORD=yourpassword npm run seed:admin
 */

import dotenv from 'dotenv';
import { connectDB } from '../lib/mongodb';
import User from '../app/models/User';
import { hashPassword } from '../lib/auth';

// Load environment variables
dotenv.config({ path: '.env.local' });

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin User';

async function seedAdmin() {
  try {
    console.log('🌱 Starting admin user seed...\n');

    // Connect to database
    await connectDB();
    console.log('✅ Connected to MongoDB\n');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

    if (existingAdmin) {
      console.log(`⚠️  Admin user already exists with email: ${ADMIN_EMAIL}`);
      console.log('   To update, delete the existing user first or use a different email.\n');
      process.exit(0);
    }

    // Hash the password
    console.log('🔐 Hashing password...');
    const hashedPassword = await hashPassword(ADMIN_PASSWORD);

    // Create admin user
    console.log('👤 Creating admin user...');
    const admin = await User.create({
      email: ADMIN_EMAIL,
      password: hashedPassword,
      name: ADMIN_NAME,
      role: 'admin',
      bio: 'Portfolio Administrator',
    });

    console.log('\n✅ Admin user created successfully!\n');
    console.log('📧 Email:', admin.email);
    console.log('👤 Name:', admin.name);
    console.log('🔑 Role:', admin.role);
    console.log('🆔 ID:', admin._id.toString());
    console.log('\n🔐 Login credentials:');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log('\n⚠️  Make sure to change the default password after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    process.exit(1);
  }
}

// Run the seed function
seedAdmin();
