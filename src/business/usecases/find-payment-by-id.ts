import { PaymentRepository } from '@/domain/repositories/payment.repository';
import { FindPaymentByIdUseCase } from '@/domain/usecases/find-payment-by-id.usecase';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindPaymentById implements FindPaymentByIdUseCase {
  constructor(private readonly _paymentRepository: PaymentRepository) {}

  public async execute(input: FindPaymentByIdUseCase.Input): Promise<FindPaymentByIdUseCase.Output> {
    const payment = await this._paymentRepository.findById({ id: input.id });

    if (!payment) {
      throw new NotFoundException('Payment not found.');
    }

    return payment;
  }
}
