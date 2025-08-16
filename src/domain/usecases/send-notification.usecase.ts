import { NotificationType } from '@/domain/enums/notification-type.enum';

export abstract class SendNotificationUseCase {
  abstract execute(input: SendNotificationUseCase.Input): Promise<SendNotificationUseCase.Output>;
}

export namespace SendNotificationUseCase {
  export type Input = {
    userId: string;
    message: string;
    type: NotificationType;
  };

  export type Output = void;
}
