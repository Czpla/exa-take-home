import { Payment } from '@/domain/entities/payment.entity';

export abstract class FindAllNotificationUseCase {
  abstract execute(): Promise<FindAllNotificationUseCase.Output>;
}

export namespace FindAllNotificationUseCase {
  export type Output = Payment[] | null;
}
