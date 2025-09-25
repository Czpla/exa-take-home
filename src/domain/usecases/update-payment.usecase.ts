import { PaymentStatus } from '@/domain/enums/payment-status.enum';

export abstract class UpdatePaymentUseCase {
  abstract execute(input: UpdatePaymentUseCase.Input): Promise<UpdatePaymentUseCase.Output>;
}

export namespace UpdatePaymentUseCase {
  export type Input = {
    id: string;
    description?: string;
    amount?: number;
    status?: PaymentStatus;
  };

  export type Output = void;
}
