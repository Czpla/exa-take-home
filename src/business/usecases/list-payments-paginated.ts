import { PaymentRepository } from '@/domain/repositories/payment.repository';
import { ListPaymentsPaginatedUseCase } from '@/domain/usecases/list-payments-paginated.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListPaymentsPaginated implements ListPaymentsPaginatedUseCase {
  constructor(private readonly _paymentRepository: PaymentRepository) {}

  public async execute(input: ListPaymentsPaginatedUseCase.Input): Promise<ListPaymentsPaginatedUseCase.Output> {
    return await this._paymentRepository.listPaginated({
      cpf: input.cpf,
      paymentMethod: input.paymentMethod,
      skip: input.skip,
      take: input.take,
    });
  }
}
