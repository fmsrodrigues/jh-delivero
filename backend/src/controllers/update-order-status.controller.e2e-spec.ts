import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Update order status (E2E)', () => {
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

  test('[PUT] /questions', async () => {
    const order = await prisma.order.create({
      data: {
        clientName: 'John Doe',
        deliveryAddress: 'House A',
        shippedAt: null,
        deliveredAt: null,
      },
    });
    const orderId = order.id;

    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        passwordHash: '123456',
      },
    });

    const accessToken = jwt.sign({ sub: user.id });

    let invalidBody = await request(app.getHttpServer())
      .put(`/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ status: 'gibberish' });
    expect(invalidBody.status).toBe(400);

    invalidBody = await request(app.getHttpServer())
      .put(`/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ status: 'delivered' });
    expect(invalidBody.status).toBe(400);

    const shippedOrderReq = await request(app.getHttpServer())
      .put(`/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ status: 'shipped' });
    expect(shippedOrderReq.status).toBe(201);

    const shippedOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    expect(shippedOrder).toBeTruthy();
    expect(shippedOrder!.shippedAt).not.toBeNull();

    invalidBody = await request(app.getHttpServer())
      .put(`/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ status: 'shipped' });
    expect(invalidBody.status).toBe(400);

    const deliveredOrderReq = await request(app.getHttpServer())
      .put(`/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ status: 'delivered' });
    expect(deliveredOrderReq.status).toBe(201);

    const deliveredOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    expect(deliveredOrder).toBeTruthy();
    expect(deliveredOrder!.shippedAt).not.toBeNull();
    expect(deliveredOrder!.deliveredAt).not.toBeNull();

    invalidBody = await request(app.getHttpServer())
      .put(`/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ status: 'delivered' });
    expect(invalidBody.status).toBe(400);
  });
});
