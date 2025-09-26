import { Payment } from '@/domain/entities/payment.entity';
import { PaymentMethod } from '@/domain/enums/payment-method.enum';
import { createZodDto } from 'nestjs-zod/dto';
import z from 'zod';

export const listPaymentPaginatedInputSchema = z.object({
  cpf: z.string().min(11).max(14).optional(),
  paymentMethod: z.nativeEnum(PaymentMethod).optional(),
  skip: z.coerce.number().min(0).default(0),
  take: z.coerce.number().min(1).max(100).default(10),
});

export class ListPaymentPaginatedInputDto extends createZodDto(listPaymentPaginatedInputSchema) {}

export const listPaymentPaginatedOutputSchema = z.object({
  id: z.string(),
  cpf: z.string().min(11).max(14),
  description: z.string().min(5).max(100),
  amount: z.number().min(0.01),
  paymentMethod: z.nativeEnum(PaymentMethod),
  status: z.string(),
});

export class ListPaymentPaginatedOutputDto extends createZodDto(listPaymentPaginatedOutputSchema) {
  public static fromEntity(payment: Payment): ListPaymentPaginatedOutputDto {
    return listPaymentPaginatedOutputSchema.parse({
      id: payment.id,
      cpf: payment.cpf,
      description: payment.description,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      status: payment.status,
    });
  }
}
