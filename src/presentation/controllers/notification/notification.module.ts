import { Module } from '@nestjs/common';
import { NotificationController } from '@/presentation/controllers/notification/notification.controller';
import { SendNotification } from '@/business/usecases/send-notification';
import { RabbitMQService } from '@/infrastructure/messaging/rabbitmq/rabbitmq.service';
import { SendNotificationUseCase } from '@/domain/usecases/send-notification.usecase';
import { ClientMessaging } from '@/domain/messaging/client.messaging';
import { NotificationSubscriber } from '@/presentation/controllers/notification/notification-subscriber.controller';
import { ProcessNotificationUseCase } from '@/domain/usecases/process-notification.usecase';
import { ProcessNotification } from '@/business/usecases/process-notification';
import { NotificationRepository } from '@/domain/repositories/notification.repository';
import { PrismaNotificationRepository } from '@/infrastructure/database/prisma/repositories/prisma-notification.reporitory';
import { FindAllNotificationUseCase } from '@/domain/usecases/find-all-notification.usecase';
import { FindAllNotification } from '@/business/usecases/find-all-notification';
import { FindByIdNotification } from '@/business/usecases/find-by-id-notification';
import { FindByIdNotificationUseCase } from '@/domain/usecases/find-by-id-notification.usecase';
import { CheckStatusNotification } from '@/business/usecases/check-status-notification';
import { CheckStatusNotificationUseCase } from '@/domain/usecases/check-status-notification.usecase';

@Module({
  providers: [
    {
      provide: ClientMessaging,
      useClass: RabbitMQService,
    },
    {
      provide: SendNotificationUseCase,
      useClass: SendNotification,
    },
    {
      provide: ProcessNotificationUseCase,
      useClass: ProcessNotification,
    },
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
    {
      provide: FindAllNotificationUseCase,
      useClass: FindAllNotification,
    },
    {
      provide: FindByIdNotificationUseCase,
      useClass: FindByIdNotification,
    },
    {
      provide: CheckStatusNotificationUseCase,
      useClass: CheckStatusNotification,
    },
  ],
  controllers: [NotificationController, NotificationSubscriber],
})
export class NotificationModule {}
