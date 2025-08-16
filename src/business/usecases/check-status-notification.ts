import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@/domain/repositories/notification.repository';
import { CheckStatusNotificationUseCase } from '@/domain/usecases/check-status-notification.usecase';

@Injectable()
export class CheckStatusNotification implements CheckStatusNotificationUseCase {
  constructor(private readonly _notificationRepository: NotificationRepository) {}

  public async execute(input: CheckStatusNotificationUseCase.Input): Promise<CheckStatusNotificationUseCase.Output> {
    return await this._notificationRepository.checkStatus({ id: input.id });
  }
}
