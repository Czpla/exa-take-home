import { PaymentMethod } from '@/domain/enums/payment-method.enum';
import { PaymentStrategy } from '@/domain/strategys/payment.strategy';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PixStrategy } from '@/business/strategies/pix.strategy';
import { CreditCardStrategy } from '@/business/strategies/credit-card.strategy';
import { GetPaymentStrategyFactory } from '@/domain/factories/get-payment-strategy.factory';

@Injectable()
export class GetPaymentStrategy implements GetPaymentStrategyFactory {
  constructor(
    private readonly pixStrategy: PixStrategy,
    private readonly creditCardStrategy: CreditCardStrategy,
  ) {}

  public execute(input: GetPaymentStrategyFactory.Input): PaymentStrategy {
    switch (input.paymentMethod) {
      case PaymentMethod.PIX:
        return this.pixStrategy;
      case PaymentMethod.CREDIT_CARD:
        return this.creditCardStrategy;
      default:
        throw new BadRequestException(`Payment method ${String(input.paymentMethod)} not supported.`);
    }
  }
}
