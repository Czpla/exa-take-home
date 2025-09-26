import { PaymentStrategy } from '@/domain/strategys/payment.strategy';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PixStrategy implements PaymentStrategy {
  public async process(input: PaymentStrategy.Input): Promise<PaymentStrategy.Output> {
    return {
      id: await Promise.resolve(null),
      paymentLink: await Promise.resolve(null),
    };
  }
}
