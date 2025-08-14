import { Notification } from '@/domain/entities/notification.entity';

export abstract class ProcessNotificationUseCase {
  abstract execute(input: ProcessNotificationUseCase.Input): Promise<ProcessNotificationUseCase.Output>;
}

export namespace ProcessNotificationUseCase {
  export type Input = Notification;

  export type Output = void;
}
