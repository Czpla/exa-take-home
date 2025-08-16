import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@/domain/repositories/notification.repository';
import { FindAllNotificationUseCase } from '@/domain/usecases/find-all-notification.usecase';

@Injectable()
export class FindAllNotification implements FindAllNotificationUseCase {
  constructor(private readonly _notificationRepository: NotificationRepository) {}

  public async execute(): Promise<FindAllNotificationUseCase.Output> {
    return await this._notificationRepository.findAll();
  }
}
