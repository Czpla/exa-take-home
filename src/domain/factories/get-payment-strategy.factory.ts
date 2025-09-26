import { PaymentStrategy } from '@/domain/strategys/payment.strategy';
import { PaymentMethod } from '@/domain/enums/payment-method.enum';

export abstract class GetPaymentStrategyFactory {
  abstract execute(input: GetPaymentStrategyFactory.Input): PaymentStrategy;
}

export namespace GetPaymentStrategyFactory {
  export type Input = {
    paymentMethod: PaymentMethod;
  };

  export type Output = PaymentStrategy;
}
