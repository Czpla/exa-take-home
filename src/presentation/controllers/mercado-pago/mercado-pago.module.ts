import { Module } from '@nestjs/common';
import { MercadoPagoController } from '@/presentation/controllers/mercado-pago/mercado-pago.controller';
import { ProcessPaymentUseCase } from '@/domain/usecases/process-payment.usecase';
import { ProcessPayment } from '@/business/usecases/process-payment';
import { PaymentGateway } from '@/domain/gateways/payment.gateway';
import { MercadoPagoGateway } from '@/infrastructure/gateways/payments/mercado-pago/mercado-pago.gateway';
import { PaymentRepository } from '@/domain/repositories/payment.repository';
import { PrismaPaymentRepository } from '@/infrastructure/database/prisma/repositories/prisma-notification.reporitory';

@Module({
  providers: [
    {
      provide: PaymentRepository,
      useClass: PrismaPaymentRepository,
    },
    {
      provide: ProcessPaymentUseCase,
      useClass: ProcessPayment,
    },
    {
      provide: PaymentGateway,
      useClass: MercadoPagoGateway,
    },
  ],
  controllers: [MercadoPagoController],
})
export class MercadoPagoModule {}
