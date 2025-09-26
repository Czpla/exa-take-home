import { PaymentStatus } from '@/domain/enums/payment-status.enum';
import { createZodDto } from 'nestjs-zod/dto';
import z from 'zod';

export const updatePaymentInputSchema = z.object({
  status: z.nativeEnum(PaymentStatus),
});

export class UpdatePaymentInputDto extends createZodDto(updatePaymentInputSchema) {}
