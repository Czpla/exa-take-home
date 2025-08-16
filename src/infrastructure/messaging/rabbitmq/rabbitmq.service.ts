import { ClientMessaging } from '@/domain/messaging/client.messaging';
import { Environment } from '@/main/config/environment/environment.config';
import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RabbitMQService implements ClientMessaging {
  private readonly _client: ClientProxy;

  constructor(private readonly environment: Environment) {
    this._client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.environment.rabbitmqUrl],
        queue: this.environment.rabbitmqQueueEvents,
        // routingKey: 'notifications',
        queueOptions: {
          durable: true,
        },
        noAck: true,
      },
    });
  }

  public async emit<T>(pattern: string, data: T): Promise<void> {
    await firstValueFrom(this._client.emit(pattern, data));
  }

  public async send<T, R>(pattern: string, data: T): Promise<R> {
    return firstValueFrom(this._client.send<R>(pattern, data));
  }
}
