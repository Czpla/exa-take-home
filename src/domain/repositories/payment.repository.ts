import { Payment } from '@/domain/entities/payment.entity';
import { PaymentMethod } from '@/domain//enums/payment-method.enum';

export abstract class PaymentRepository {
  public abstract save(input: PaymentRepository.Save.Input): Promise<PaymentRepository.Save.Output>;
  public abstract findById(input: PaymentRepository.FindById.Input): Promise<PaymentRepository.FindById.Output>;
  public abstract update(input: PaymentRepository.Update.Input): Promise<PaymentRepository.Update.Output>;
  public abstract listPaginated(
    input: PaymentRepository.ListPaginated.Input,
  ): Promise<PaymentRepository.ListPaginated.Output>;
}

export namespace PaymentRepository {
  export namespace Save {
    export type Input = Payment;

    export type Output = Payment;
  }

  export namespace FindById {
    export interface Input {
      id: string;
    }

    export type Output = Payment | null;
  }

  export namespace Update {
    export type Input = Partial<Payment> & { id: string };

    export type Output = void;
  }

  export namespace ListPaginated {
    export interface Input {
      cpf?: string;
      paymentMethod?: PaymentMethod;
      skip: number;
      take: number;
    }

    export type Output = Payment[];
  }
}
