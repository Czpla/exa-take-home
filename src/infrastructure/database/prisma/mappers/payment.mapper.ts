import { Payment } from '@/domain/entities/payment.entity';
import { Prisma, PaymentMethod, PaymentStatus, Payment as PrismaPayment } from '@prisma/client';
import { PaymentMethod as DomainPaymentMethod } from '@/domain/enums/payment-method.enum';
import { PaymentStatus as DomainPaymentStatus } from '@/domain/enums/payment-status.enum';
import { BadRequestException } from '@nestjs/common';

type PrismaDataInput = Prisma.PaymentCreateInput | Prisma.PaymentUpdateInput;

const domainToPrismaMethodMap: Record<DomainPaymentMethod, PaymentMethod> = {
  [DomainPaymentMethod.CREDIT_CARD]: PaymentMethod.CREDIT_CARD,
  [DomainPaymentMethod.PIX]: PaymentMethod.PIX,
};

const domainToPrismaStatusMap: Record<DomainPaymentStatus, PaymentStatus> = {
  [DomainPaymentStatus.PENDING]: PaymentStatus.PENDING,
  [DomainPaymentStatus.PAID]: PaymentStatus.PAID,
  [DomainPaymentStatus.FAIL]: PaymentStatus.FAIL,
};

export class PaymentMapper {
  public static toPrisma<T extends PrismaDataInput>(payment: Partial<Payment>): T {
    const data: Partial<T> = {};

    if (payment.cpf) data.cpf = payment.cpf;
    if (payment.description) data.description = payment.description;

    if (payment.amount) data.amount = Number(payment.amount);
    if (payment.paymentMethod) data.paymentMethod = this.toPrismaPaymentMethod(payment.paymentMethod);
    if (payment.status) data.status = this.toPrismaPaymentStatus(payment.status);

    if (payment.createdAt) {
      data.createdAt = payment.createdAt;
    }

    if (Object.keys(data).length > 0) {
      data.updatedAt = new Date();
    }

    return data as T;
  }

  public static toDomain(payment: PrismaPayment): Payment {
    return Payment.fromJSON({
      id: payment.id,
      cpf: payment.cpf,
      description: payment.description,
      amount: Number(payment.amount),
      paymentMethod: this.toDomainPaymentMethod(payment.paymentMethod),
      status: this.toDomainPaymentStatus(payment.status),
    });
  }

  private static toDomainPaymentMethod(method: PaymentMethod): DomainPaymentMethod {
    const domainMethod = Object.keys(domainToPrismaMethodMap).find(
      (key) => domainToPrismaMethodMap[key as DomainPaymentMethod] === method,
    );

    if (!domainMethod) {
      throw new Error(`Prisma method ${method} not mapped to Domain.`);
    }

    return domainMethod as DomainPaymentMethod;
  }

  private static toDomainPaymentStatus(status: PaymentStatus): DomainPaymentStatus {
    const domainStatus = Object.keys(domainToPrismaStatusMap).find(
      (key) => domainToPrismaStatusMap[key as DomainPaymentStatus] === status,
    );

    if (!domainStatus) {
      throw new Error(`Prisma status ${status} not mapped to Domain.`);
    }

    return domainStatus as DomainPaymentStatus;
  }

  private static toPrismaPaymentMethod(method: DomainPaymentMethod): PaymentMethod {
    const prismaMethod = domainToPrismaMethodMap[method];

    if (!prismaMethod) {
      throw new BadRequestException(`Payment method unknown: ${String(method)}`);
    }

    return prismaMethod;
  }

  private static toPrismaPaymentStatus(status: DomainPaymentStatus): PaymentStatus {
    const prismaStatus = domainToPrismaStatusMap[status];

    if (!prismaStatus) {
      throw new BadRequestException(`Payment status unknown: ${String(status)}`);
    }

    return prismaStatus;
  }
}
