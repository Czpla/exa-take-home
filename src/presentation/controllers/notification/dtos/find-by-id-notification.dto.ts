import { Notification } from '@/domain/entities/notification.entity';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const findByIdOutputSchema = z.object({
  id: z.string(),
  userId: z.string(),
  message: z.string(),
  type: z.string(),
  status: z.string(),
  createdAt: z.date(),
});

export class FindByIdOutputDto extends createZodDto(findByIdOutputSchema) {
  public static fromEntity(notification: Notification): FindByIdOutputDto {
    return findByIdOutputSchema.parse({
      id: notification.id,
      userId: notification.userId,
      message: notification.message,
      type: notification.type,
      status: notification.status,
      createdAt: notification.createdAt,
    });
  }
}
