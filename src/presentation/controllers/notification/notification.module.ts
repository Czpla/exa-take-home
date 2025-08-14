import { Module } from '@nestjs/common';
import { NotificationController } from '@/presentation/controllers/notification/notification.controller';
import { SendNotification } from '@/business/usecases/send-notification';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitMQService } from '@/infrastructure/messaging/rabbitmq/rabbitmq.service';
import { SendNotificationUseCase } from '@/domain/usecases/send-notification.usecase';
import { RabbitMQModule } from '@/infrastructure/messaging/rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitMQModule],
  providers: [
    SendNotification,
    {
      provide: ClientProxy,
      useFactory: (rabbitMQService: RabbitMQService) => rabbitMQService.getClient(),
      inject: [RabbitMQService],
    },
    {
      provide: SendNotificationUseCase,
      useExisting: SendNotification,
    },
  ],
  controllers: [NotificationController],
  exports: [SendNotification],
})
export class NotificationModule {}
