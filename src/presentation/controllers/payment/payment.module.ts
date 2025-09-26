import { Module } from '@nestjs/common';
import { PaymentController } from '@/presentation/controllers/payment/payment.controller';
import { PaymentRepository } from '@/domain/repositories/payment.repository';
import { PrismaPaymentRepository } from '@/infrastructure/database/prisma/repositories/prisma-notification.reporitory';
import { CreatePayment } from '@/business/usecases/create-payment';
import { CreatePaymentUseCase } from '@/domain/usecases/create-payment.usecase';
import { UpdatePaymentUseCase } from '@/domain/usecases/update-payment.usecase';
import { UpdatePayment } from '@/business/usecases/update-payment';
import { FindPaymentById } from '@/business/usecases/find-payment-by-id';
import { FindPaymentByIdUseCase } from '@/domain/usecases/find-payment-by-id.usecase';
import { PaymentGateway } from '@/domain/gateways/payment.gateway';
import { MercadoPagoGateway } from '@/infrastructure/gateways/payments/mercado-pago/mercado-pago.gateway';
import { GetPaymentStrategyFactory } from '@/domain/factories/get-payment-strategy.factory';
import { GetPaymentStrategy } from '@/business/factories/get-payment-strategy';
import { CreditCardStrategy } from '@/business/strategies/credit-card.strategy';
import { PixStrategy } from '@/business/strategies/pix.strategy';
import { ListPaymentsPaginatedUseCase } from '@/domain/usecases/list-payments-paginated.usecase';
import { ListPaymentsPaginated } from '@/business/usecases/list-payments-paginated';

@Module({
  providers: [
    {
      provide: PaymentRepository,
      useClass: PrismaPaymentRepository,
    },
    {
      provide: CreatePaymentUseCase,
      useClass: CreatePayment,
    },
    {
      provide: UpdatePaymentUseCase,
      useClass: UpdatePayment,
    },
    {
      provide: FindPaymentByIdUseCase,
      useClass: FindPaymentById,
    },
    {
      provide: PaymentGateway,
      useClass: MercadoPagoGateway,
    },
    {
      provide: GetPaymentStrategyFactory,
      useClass: GetPaymentStrategy,
    },
    {
      provide: ListPaymentsPaginatedUseCase,
      useClass: ListPaymentsPaginated,
    },
    PixStrategy,
    CreditCardStrategy,
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
