import { NotificationType } from '@/domain/enums/notification-type.enum';

export abstract class SendNotificationUseCase {
  abstract send(input: SendNotificationUseCase.Input): Promise<void>;
}

export namespace SendNotificationUseCase {
  export type Input = {
    userId: string;
    message: string;
    type: NotificationType;
  };
}
