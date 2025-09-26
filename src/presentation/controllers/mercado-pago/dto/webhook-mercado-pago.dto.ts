import { createZodDto } from 'nestjs-zod/dto';
import z from 'zod';

export const webhookMercadoPagoInputSchema = z.object({
  id: z.string().min(1),
  topic: z.enum(['payment']),
});

export class WebhookMercadoPagoInputDto extends createZodDto(webhookMercadoPagoInputSchema) {}
