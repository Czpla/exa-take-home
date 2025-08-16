import { Notification } from '@/domain/entities/notification.entity';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const findAllOutputSchema = z.object({
  id: z.string(),
  userId: z.string(),
  message: z.string(),
  type: z.string(),
  status: z.string(),
  createdAt: z.date(),
});

export class FindAllOutputDto extends createZodDto(findAllOutputSchema) {
  public static fromEntity(notification: Notification): FindAllOutputDto {
    return findAllOutputSchema.parse({
      id: notification.id,
      userId: notification.userId,
      message: notification.message,
      type: notification.type,
      status: notification.status,
      createdAt: notification.createdAt,
    });
  }
}
