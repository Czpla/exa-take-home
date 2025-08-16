import { Notification } from '@/domain/entities/notification.entity';

export abstract class FindAllNotificationUseCase {
  abstract execute(): Promise<FindAllNotificationUseCase.Output>;
}

export namespace FindAllNotificationUseCase {
  export type Output = Notification[] | null;
}
