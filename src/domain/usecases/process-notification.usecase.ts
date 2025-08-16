import { Notification } from '@/domain/entities/notification.entity';
import { NotificationStatus } from '@/domain/enums/notification-status.enum';

export abstract class ProcessNotificationUseCase {
  abstract execute(input: ProcessNotificationUseCase.Input): Promise<ProcessNotificationUseCase.Output>;
}

export namespace ProcessNotificationUseCase {
  export interface Input {
    notification: Notification;
    status: NotificationStatus;
  }

  export type Output = void;
}
