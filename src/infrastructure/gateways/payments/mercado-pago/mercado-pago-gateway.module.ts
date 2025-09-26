import { Module } from '@nestjs/common';
import { MercadoPagoGateway } from '@/infrastructure/gateways/payments/mercado-pago/mercado-pago.gateway';

@Module({
  exports: [MercadoPagoGateway],
  providers: [MercadoPagoGateway],
})
export class MercadoPagoGatewayModule {}
