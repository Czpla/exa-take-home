import { Injectable } from '@nestjs/common';
import { ProcessNotificationUseCase } from '@/domain/usecases/process-notification.usecase';
import { PrismaNotificationRepository } from '@/infrastructure/database/prisma/repositories/prisma-notification.reporitory';
import { NotificationStatus } from '@/domain/enums/notification-status.enum';

@Injectable()
export class ProcessNotification implements ProcessNotificationUseCase {
    constructor(private readonly _prismaNotificationRepository: PrismaNotificationRepository) {}

    public async execute(input: ProcessNotificationUseCase.Input): Promise<ProcessNotificationUseCase.Output> {
        await this._prismaNotificationRepository.updateStatus({
            id: input.id,
            status: NotificationStatus.PROCESSED
        });

        console.log(`Notification ${ input.id } processed for user ${ input.userId } successfully.`);
    }
}
