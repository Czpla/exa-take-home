import { Payment } from '@/domain/entities/payment.entity';
import { PaymentMethod } from '@/domain/enums/payment-method.enum';
import { createZodDto } from 'nestjs-zod/dto';
import z from 'zod';

export const CreatePaymentInputSchema = z.object({
  cpf: z.string().min(11).max(14),
  description: z.string().min(5).max(100),
  amount: z.number().min(0.01),
  paymentMethod: z.nativeEnum(PaymentMethod),
});

export class CreatePaymentInputDto extends createZodDto(CreatePaymentInputSchema) {}

export const createPaymentOutputSchema = z.object({
  id: z.string(),
  status: z.string(),
});

export class CreatePaymentOutputDto extends createZodDto(createPaymentOutputSchema) {
  public static fromEntity(payment: Payment): CreatePaymentOutputDto {
    return createPaymentOutputSchema.parse({
      id: payment.id,
      status: payment.status,
    });
  }
}
