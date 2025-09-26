import { PaymentStatus } from '@/domain/enums/payment-status.enum';

export abstract class PaymentGateway {
  public abstract createPaymentLink(
    input: PaymentGateway.CreatePaymentLink.Input,
  ): Promise<PaymentGateway.CreatePaymentLink.Output>;
  public abstract verifyPayment(
    input: PaymentGateway.VerifyPayment.Input,
  ): Promise<PaymentGateway.VerifyPayment.Output>;
}

export namespace PaymentGateway {
  export namespace VerifyPayment {
    export type Input = {
      externalId: string;
    };

    export type Output = {
      status: PaymentStatus;
      localId: string;
    };
  }

  export namespace CreatePaymentLink {
    export type Input = {
      localId: string;
      items: Array<{ id: string; title: string; quantity: number; unit_price: number }>;
    };

    export type Output = {
      id: string;
      url: string;
    };
  }
}
