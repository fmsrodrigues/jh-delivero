import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function generateDefaultUser() {
  console.log(`Creating default user`);
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: hashSync('123456', 8),
    },
  });
}

async function generateUsers() {
  for (let i = 1; i <= 10; i++) {
    console.log(`Creating user: ${i}`);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    await prisma.user.create({
      data: {
        email: faker.internet.email({ firstName, lastName }),
        name: faker.person.fullName({ firstName, lastName }),
        passwordHash: hashSync(faker.internet.password(), 8),
      },
    });
  }
}

async function generateOrders() {
  for (let i = 1; i <= 1000; i++) {
    const shippedAt = Math.random() > 0.5 ? faker.date.past() : null;
    const orderedAt = shippedAt
      ? faker.date.past({ refDate: shippedAt })
      : faker.date.past();
    const deliveredAt =
      shippedAt && Math.random() > 0.5
        ? faker.date.future({ refDate: shippedAt })
        : null;

    console.log(`Creating order: ${i}`);
    await prisma.order.create({
      data: {
        clientName: faker.person.fullName(),
        deliveryAddress: faker.location.streetAddress(),
        orderedAt,
        shippedAt,
        deliveredAt,
      },
    });
  }
}

generateDefaultUser();
generateUsers();
generateOrders();
