import { ProcessPaymentUseCase } from '@/domain/usecases/process-payment.usecase';
import { Controller, Post, Query } from '@nestjs/common';
import { WebhookMercadoPagoInputDto } from '@/presentation/controllers/mercado-pago/dto/webhook-mercado-pago.dto';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly _processPaymentUseCase: ProcessPaymentUseCase) {}

  @Post('webhook')
  async handleWebhook(@Query() query: WebhookMercadoPagoInputDto) {
    return await this._processPaymentUseCase.execute({
      externalId: query.id,
    });
  }
}
