import { Payment } from '@/domain/entities/payment.entity';

export abstract class FindPaymentByIdUseCase {
  abstract execute(input: FindPaymentByIdUseCase.Input): Promise<FindPaymentByIdUseCase.Output>;
}

export namespace FindPaymentByIdUseCase {
  export type Input = { id: string };
  export type Output = Payment;
}
