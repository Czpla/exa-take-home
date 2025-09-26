import { Payment } from '@/domain/entities/payment.entity';
import { PaymentStatus } from '@/domain/enums/payment-status.enum';
import { PaymentRepository } from '@/domain/repositories/payment.repository';
import { CreatePaymentUseCase } from '@/domain/usecases/create-payment.usecase';
import { GetPaymentStrategyFactory } from '@/domain/factories/get-payment-strategy.factory';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CreatePayment implements CreatePaymentUseCase {
  constructor(
    private readonly _paymentRepository: PaymentRepository,
    private readonly _getPaymentStrategyFactory: GetPaymentStrategyFactory,
  ) {}

  public async execute(input: CreatePaymentUseCase.Input): Promise<CreatePaymentUseCase.Output> {
    const localId = randomUUID();

    const payment = Payment.create({
      id: localId,
      cpf: input.cpf,
      description: input.description,
      amount: input.amount,
      paymentMethod: input.paymentMethod,
      status: PaymentStatus.PENDING,
    });

    await this._paymentRepository.save(payment);

    return await this._getPaymentStrategyFactory
      .execute({
        paymentMethod: input.paymentMethod,
      })
      .process({
        id: localId,
        cpf: input.cpf,
        description: input.description,
        amount: input.amount,
        paymentMethod: input.paymentMethod,
      });
  }
}
