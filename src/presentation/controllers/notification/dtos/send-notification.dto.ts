import { NotificationType } from '@/domain/enums/notification-type.enum';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const SendInputSchema = z.object({
  userId: z.string().uuid(),
  message: z.string().min(10).max(500),
  type: z.nativeEnum(NotificationType),
});

export class SendInputDto extends createZodDto(SendInputSchema) {}
