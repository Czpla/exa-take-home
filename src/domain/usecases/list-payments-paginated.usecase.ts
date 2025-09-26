import { PaymentMethod } from '@/domain/enums/payment-method.enum';
import { Payment } from '@/domain/entities/payment.entity';

export abstract class ListPaymentsPaginatedUseCase {
  abstract execute(input: ListPaymentsPaginatedUseCase.Input): Promise<ListPaymentsPaginatedUseCase.Output>;
}

export namespace ListPaymentsPaginatedUseCase {
  export type Input = {
    cpf?: string;
    paymentMethod?: PaymentMethod;
    skip: number;
    take: number;
  };

  export type Output = Payment[] | null;
}
