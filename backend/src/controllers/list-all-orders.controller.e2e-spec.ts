import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('List all orders (E2E)', () => {
  let app: INestApplication, prisma: PrismaService, jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[GET] /orders', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        passwordHash: '123456',
      },
    });

    const accessToken = jwt.sign({ sub: user.id });

    await prisma.order.createMany({
      data: [
        {
          clientName: 'John One',
          deliveryAddress: 'House A',
          shippedAt: new Date(),
          deliveredAt: new Date(),
        },
        {
          clientName: 'John Two',
          deliveryAddress: 'House B',
          shippedAt: new Date(),
          deliveredAt: null,
        },
        {
          clientName: 'John Three',
          deliveryAddress: 'House C',
          shippedAt: null,
          deliveredAt: null,
        },
      ],
    });

    const res = await request(app.getHttpServer())
      .get('/orders')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      orders: [
        expect.objectContaining({ clientName: 'John One' }),
        expect.objectContaining({ clientName: 'John Two' }),
        expect.objectContaining({ clientName: 'John Three' }),
      ],
    });
  });
});
