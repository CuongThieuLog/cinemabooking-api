import { PrismaClient, Role } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  // Hash password
  const hashedPassword = await argon2.hash('admin@123');

  // Create admin user
  await prisma.user.create({
    data: {
      first_name: 'Admin',
      last_name: 'Cinema',
      email: 'admin@gmail.com',
      role: Role.ADMIN,
      password: hashedPassword,
    },
  });

  console.log('Admin user seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
