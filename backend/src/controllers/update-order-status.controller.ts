import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';
import { z } from 'zod';

const updateOrderStatusBodySchema = z.object({
  status: z.enum(['shipped', 'delivered']),
});

const bodyValidationPipe = new ZodValidationPipe(updateOrderStatusBodySchema);

type UpdateOrderStatusBodySchema = z.infer<typeof updateOrderStatusBodySchema>;

@Controller('/orders/:id/status')
@UseGuards(JwtAuthGuard)
export class UpdateOrderStatusController {
  constructor(private prisma: PrismaService) {}

  @Put()
  @HttpCode(201)
  async handle(
    @Param('id') id: string,
    @Body(bodyValidationPipe) body: UpdateOrderStatusBodySchema,
  ) {
    const { status } = body;

    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    let statusUpdated = false;
    let shippedAt = order.shippedAt ? new Date(order.shippedAt) : null;
    let deliveredAt = order.deliveredAt ? new Date(order.deliveredAt) : null;

    if (status === 'delivered' && shippedAt && !deliveredAt) {
      deliveredAt = new Date();
      statusUpdated = true;
    }

    if (status === 'shipped' && !shippedAt) {
      shippedAt = new Date();
      statusUpdated = true;
    }

    if (!statusUpdated) {
      throw new BadRequestException('Invalid status update');
    }

    await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        ...order,
        shippedAt,
        deliveredAt,
      },
    });
  }
}
