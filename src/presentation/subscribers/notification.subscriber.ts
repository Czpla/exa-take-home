import { Notification } from '@/domain/entities/notification.entity';
import { ProcessNotificationUseCase } from '@/domain/usecases/process-notification.usecase';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

@Injectable()
export class NotificationSubscriber implements OnModuleInit {
    constructor(
        private readonly _processNotificationUseCase: ProcessNotificationUseCase,
        private readonly _client: ClientProxy,
    ) {}

    onModuleInit() { this._client.connect(); }

    @MessagePattern('notifications')
    async handleNotification(@Payload() notification: Notification, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        try {
            await this._processNotificationUseCase.execute(notification);

            channel.ack(originalMsg);
        } catch (error) {
            console.error(`Error processing notification ${ notification.id }:`, error);

            channel.nack(originalMsg, false, false);
        }
    }
}
