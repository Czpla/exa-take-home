import { PaymentMethod } from '@/domain/enums/payment-method.enum';
import { createZodDto } from 'nestjs-zod/dto';
import z from 'zod';

export const createPaymentInputSchema = z.object({
  cpf: z.string().min(11).max(14),
  description: z.string().min(5).max(100),
  amount: z.number().min(0.01),
  paymentMethod: z.nativeEnum(PaymentMethod),
});

export class CreatePaymentInputDto extends createZodDto(createPaymentInputSchema) {}

export const createPaymentOutputSchema = z.object({
  id: z.string().nullable(),
  paymentLink: z.string().nullable(),
});

export class CreatePaymentOutputDto extends createZodDto(createPaymentOutputSchema) {}
