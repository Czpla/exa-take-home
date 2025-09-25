import { Injectable } from '@nestjs/common';
import { PaymentRepository } from '@/domain/repositories/payment.repository';
import { Payment } from '@/domain/entities/payment.entity';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';
import { PaymentMapper } from '@/infrastructure/database/prisma/mappers/payment.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  public async save(input: PaymentRepository.Save.Input): Promise<PaymentRepository.Save.Output> {
    const payment = await this._prismaService.payment.create({
      data: PaymentMapper.toPrisma<Prisma.PaymentCreateInput>(input),
    });

    return PaymentMapper.toDomain(payment);
  }

  // public async findAll(): Promise<PaymentRepository.FindAll.Output> {
  //   const notifications = await this._prismaService.notification.findMany();

  //   if (notifications.length === 0) {
  //     return null;
  //   }

  //   return notifications.map((notification) => Payment.fromJSON(notification));
  // }

  public async findById(input: PaymentRepository.FindById.Input): Promise<PaymentRepository.FindById.Output> {
    const payment = await this._prismaService.payment.findUnique({ where: { id: input.id } });

    if (!payment) {
      return null;
    }

    return PaymentMapper.toDomain(payment);
  }

  public async update(input: PaymentRepository.Update.Input): Promise<PaymentRepository.Update.Output> {
    await this._prismaService.payment.update({
      where: { id: input.id },
      data: PaymentMapper.toPrisma<Prisma.PaymentUpdateInput>(input),
    });
  }

  // public async checkStatus(input: PaymentRepository.CheckStatus.Input): Promise<PaymentRepository.CheckStatus.Output> {
  //   const notification = await this._prismaService.notification.findUnique({ where: { id: input.id } });

  //   if (!notification) {
  //     return null;
  //   }

  //   return Payment.fromJSON(notification)?.status;
  // }

  // public async updateStatus(
  //   input: PaymentRepository.UpdateStatus.Input,
  // ): Promise<PaymentRepository.UpdateStatus.Output> {
  //   await this._prismaService.notification.update({ where: { id: input.id }, data: { status: input.status } });
  // }
}
