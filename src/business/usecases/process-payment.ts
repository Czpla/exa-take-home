import { PaymentGateway } from '@/domain/gateways/payment.gateway';
import { PaymentRepository } from '@/domain/repositories/payment.repository';
import { ProcessPaymentUseCase } from '@/domain/usecases/process-payment.usecase';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProcessPayment implements ProcessPaymentUseCase {
  constructor(
    private readonly _paymentGateway: PaymentGateway,
    private readonly _paymentRepository: PaymentRepository,
  ) {}

  public async execute(input: ProcessPaymentUseCase.Input): Promise<ProcessPaymentUseCase.Output> {
    const verified = await this._paymentGateway.verifyPayment({
      externalId: input.externalId,
    });

    const existingPayment = await this._paymentRepository.findById({ id: verified.localId });

    if (!existingPayment) {
      throw new NotFoundException(`Payment with local ID ${verified.localId} not found.`);
    }

    await this._paymentRepository.update({ id: verified.localId, status: verified.status });
  }
}
