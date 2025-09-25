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
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
