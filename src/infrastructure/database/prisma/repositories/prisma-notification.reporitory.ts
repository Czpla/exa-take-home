import { Injectable } from '@nestjs/common';
import { PaymentRepository } from '@/domain/repositories/payment.repository';
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

  public async listPaginated(
    input: PaymentRepository.ListPaginated.Input,
  ): Promise<PaymentRepository.ListPaginated.Output> {
    const payments = await this._prismaService.payment.findMany({
      where: {
        cpf: input.cpf,
        paymentMethod: input.paymentMethod ? PaymentMapper.toPrismaPaymentMethod(input.paymentMethod) : undefined,
      },
      skip: input.skip,
      take: input.take,
      orderBy: { createdAt: 'desc' },
    });

    return payments.map((payment) => PaymentMapper.toDomain(payment));
  }
}
