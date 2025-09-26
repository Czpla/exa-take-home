import { PaymentMethod } from '@/domain/enums/payment-method.enum';

export abstract class CreatePaymentUseCase {
  abstract execute(input: CreatePaymentUseCase.Input): Promise<CreatePaymentUseCase.Output>;
}

export namespace CreatePaymentUseCase {
  export type Input = {
    cpf: string;
    description: string;
    amount: number;
    paymentMethod: PaymentMethod;
  };

  export type Output = {
    id: string | null;
    paymentLink: string | null;
  };
}
