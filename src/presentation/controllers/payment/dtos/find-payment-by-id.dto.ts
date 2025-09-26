import { Payment } from '@/domain/entities/payment.entity';
import { PaymentMethod } from '@/domain/enums/payment-method.enum';
import { createZodDto } from 'nestjs-zod/dto';
import z from 'zod';

export const findPaymentByIdOutputSchema = z.object({
  id: z.string(),
  cpf: z.string().min(11).max(14),
  description: z.string().min(5).max(100),
  amount: z.number().min(0.01),
  paymentMethod: z.nativeEnum(PaymentMethod),
  status: z.string(),
});

export class FindPaymentByIdOutputDto extends createZodDto(findPaymentByIdOutputSchema) {
  public static fromEntity(payment: Payment): FindPaymentByIdOutputDto {
    return findPaymentByIdOutputSchema.parse({
      id: payment.id,
      cpf: payment.cpf,
      description: payment.description,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      status: payment.status,
    });
  }
}
