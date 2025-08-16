import { Injectable } from '@nestjs/common';
import { ProcessNotificationUseCase } from '@/domain/usecases/process-notification.usecase';
import { NotificationRepository } from '@/domain/repositories/notification.repository';

@Injectable()
export class ProcessNotification implements ProcessNotificationUseCase {
  constructor(private readonly _notificationRepository: NotificationRepository) {}

  public async execute(input: ProcessNotificationUseCase.Input): Promise<ProcessNotificationUseCase.Output> {
    await this._notificationRepository.updateStatus({
      id: input.notification.id,
      status: input.status,
    });
  }
}
