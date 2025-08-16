import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@/domain/repositories/notification.repository';
import { FindByIdNotificationUseCase } from '@/domain/usecases/find-by-id-notification.usecase';

@Injectable()
export class FindByIdNotification implements FindByIdNotificationUseCase {
  constructor(private readonly _notificationRepository: NotificationRepository) {}

  public async execute(input: FindByIdNotificationUseCase.Input): Promise<FindByIdNotificationUseCase.Output> {
    return await this._notificationRepository.findById({ id: input.id });
  }
}
