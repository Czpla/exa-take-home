import { PaymentGateway } from '@/domain/gateways/payment.gateway';
import { PaymentStrategy } from '@/domain/strategys/payment.strategy';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreditCardStrategy implements PaymentStrategy {
  constructor(private readonly _paymentGateway: PaymentGateway) {}

  public async process(input: PaymentStrategy.Input): Promise<PaymentStrategy.Output> {
    const paymentLink = await this._paymentGateway.createPaymentLink({
      localId: input.id,
      items: [
        {
          id: input.id,
          title: input.description,
          quantity: 1,
          unit_price: input.amount,
        },
      ],
    });

    return {
      id: input.id,
      paymentLink: paymentLink.url,
    };
  }
}
