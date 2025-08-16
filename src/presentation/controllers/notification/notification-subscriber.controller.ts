import { Notification } from '@/domain/entities/notification.entity';
import { NotificationStatus } from '@/domain/enums/notification-status.enum';
import { ProcessNotificationUseCase } from '@/domain/usecases/process-notification.usecase';
import { Retry } from '@/main/shared/retry';
import { Controller } from '@nestjs/common';
import { Payload, Ctx, RmqContext, EventPattern } from '@nestjs/microservices';

@Controller()
export class NotificationSubscriber {
  constructor(private readonly _processNotificationUseCase: ProcessNotificationUseCase) {}

  @EventPattern('notifications')
  public async handle(@Payload() notification: Notification, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await Retry.execute(
        () =>
          this._processNotificationUseCase.execute({
            notification: notification,
            status: NotificationStatus.PROCESSED,
          }),
        3,
        1000,
      );

      channel.ack(originalMsg);
    } catch (error) {
      this._processNotificationUseCase.execute({
        notification: notification,
        status: NotificationStatus.FAILED,
      });

      channel.nack(originalMsg, false, false);
    }
  }
}
