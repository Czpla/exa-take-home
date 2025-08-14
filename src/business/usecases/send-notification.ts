import { Injectable } from '@nestjs/common';
import { Notification } from '@/domain/entities/notification.entity';
import { ClientProxy } from '@nestjs/microservices';
import { SendNotificationUseCase } from '@/domain/usecases/send-notification.usecase';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SendNotification implements SendNotificationUseCase {
  constructor(private readonly _client: ClientProxy) {}

  public async execute(input: SendNotificationUseCase.Input): Promise<void> {
    const notification = new Notification({
      id: crypto.randomUUID(),
      userId: input.userId,
      message: input.message,
      type: input.type,
    });

    await firstValueFrom(this._client.emit('notifications', notification));
  }
}
