import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/infrastructure/database/prisma/prisma.module';
import { PaymentModule } from '@/presentation/controllers/payment/payment.module';
import { EnvironmentModule } from '@/main/config/environment/environment.module';
import { MercadoPagoModule } from '@/presentation/controllers/mercado-pago/mercado-pago.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EnvironmentModule,
    PrismaModule,
    PaymentModule,
    MercadoPagoModule,
  ],
})
export class AppModule {}
