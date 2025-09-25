import { Payment } from '@/domain/entities/payment.entity';
import { PaymentStatus } from '@/domain/enums/payment-status.enum';
import { PaymentRepository } from '@/domain/repositories/payment.repository';
import { CreatePaymentUseCase } from '@/domain/usecases/create-payment.usecase';
import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CreatePayment implements CreatePaymentUseCase {
  constructor(private readonly _paymentRepository: PaymentRepository) {}

  public async execute(input: CreatePaymentUseCase.Input): Promise<CreatePaymentUseCase.Output> {
    if (input.amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero.');
    }

    if (input.cpf.length < 11 || input.cpf.length > 14) {
      throw new BadRequestException('CPF must be between 11 and 14 characters.');
    }

    if (input.description.length < 5 || input.description.length > 100) {
      throw new BadRequestException('Description must be between 5 and 100 characters.');
    }

    // TODO: Create a function that valides the CPF format.
    // TODO: Move the validations to entity, ex: Payment.create() | Payment.validate()

    const payment = new Payment({
      id: randomUUID(),
      cpf: input.cpf,
      description: input.description,
      amount: input.amount,
      paymentMethod: input.paymentMethod,
      status: PaymentStatus.PENDING,
    });

    return await this._paymentRepository.save(payment);
  }
}
