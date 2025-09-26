import { PaymentRepository } from '@/domain/repositories/payment.repository';
import { UpdatePaymentUseCase } from '@/domain/usecases/update-payment.usecase';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdatePayment implements UpdatePaymentUseCase {
  constructor(private readonly _paymentRepository: PaymentRepository) {}

  public async execute(input: UpdatePaymentUseCase.Input): Promise<UpdatePaymentUseCase.Output> {
    const payment = await this._paymentRepository.findById({ id: input.id });

    if (!payment) {
      throw new NotFoundException('Payment not found.');
    }

    await this._paymentRepository.update({
      id: payment.id,
      description: input.description,
      amount: input.amount,
      status: input.status,
      updatedAt: new Date(),
    });
  }
}
