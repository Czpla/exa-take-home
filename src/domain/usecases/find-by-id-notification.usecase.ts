import { Notification } from '@/domain/entities/notification.entity';

export abstract class FindByIdNotificationUseCase {
  abstract execute(input: FindByIdNotificationUseCase.Input): Promise<FindByIdNotificationUseCase.Output>;
}

export namespace FindByIdNotificationUseCase {
  export type Input = { id: string };
  export type Output = Notification | null;
}
