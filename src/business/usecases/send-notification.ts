import { Injectable } from '@nestjs/common';
import { Notification } from '@/domain/entities/notification.entity';
import { SendNotificationUseCase } from '@/domain/usecases/send-notification.usecase';
import { ClientMessaging } from '@/domain/messaging/client.messaging';
import { NotificationRepository } from '@/domain/repositories/notification.repository';
import { NotificationStatus } from '@/domain/enums/notification-status.enum';

@Injectable()
export class SendNotification implements SendNotificationUseCase {
  constructor(
    private readonly _clientMessaging: ClientMessaging,
    private readonly _notificationRepository: NotificationRepository,
  ) {}

  public async execute(input: SendNotificationUseCase.Input): Promise<SendNotificationUseCase.Output> {
    const notification = new Notification({
      id: crypto.randomUUID(),
      userId: input.userId,
      message: input.message,
      status: NotificationStatus.PENDING,
      type: input.type,
    });

    await this._notificationRepository.save(notification);

    await this._clientMessaging.emit<Notification>('notifications', notification);
  }
}
