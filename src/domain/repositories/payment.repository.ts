import { Payment } from '@/domain/entities/payment.entity';
import { PaymentMethod } from '@/domain/enums/payment-method.enum';
import { PaymentStatus } from '@/domain/enums/payment-status.enum';

export abstract class PaymentRepository {
  public abstract save(input: PaymentRepository.Save.Input): Promise<PaymentRepository.Save.Output>;
  // public abstract findAll(): Promise<PaymentRepository.FindAll.Output>;
  public abstract findById(input: PaymentRepository.FindById.Input): Promise<PaymentRepository.FindById.Output>;
  public abstract update(input: PaymentRepository.Update.Input): Promise<PaymentRepository.Update.Output>;
  // public abstract checkStatus(
  //   input: PaymentRepository.CheckStatus.Input,
  // ): Promise<PaymentRepository.CheckStatus.Output>;
  // public abstract updateStatus(
  //   input: PaymentRepository.UpdateStatus.Input,
  // ): Promise<PaymentRepository.UpdateStatus.Output>;
}

export namespace PaymentRepository {
  export namespace Save {
    export type Input = Payment;

    export type Output = Payment;
  }

  // export namespace FindAll {
  //   export type Output = Payment[] | null;
  // }

  export namespace FindById {
    export interface Input {
      id: string;
    }

    export type Output = Payment | null;
  }

  export namespace Update {
    // export type Input = {
    //   id: string;
    //   description?: string;
    //   amount?: number;
    //   status?: PaymentStatus;
    //   updatedAt: Date;
    // };

    export type Input = Partial<Payment> & { id: string };

    export type Output = void;
  }

  // export namespace CheckStatus {
  //   export interface Input {
  //     id: string;
  //   }

  //   export type Output = string | null;
  // }

  // export namespace UpdateStatus {
  //   export interface Input {
  //     id: string;
  //     status: NotificationStatus;
  //   }

  //   export type Output = void;
  // }
}
