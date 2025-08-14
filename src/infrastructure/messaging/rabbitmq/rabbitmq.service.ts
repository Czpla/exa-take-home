import { Environment } from '@/main/config/environment/environment.config';
import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private readonly client: ClientProxy;

  constructor(private readonly _environment: Environment) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this._environment.rabbitmqUrl],
        queue: 'notifications_queue',
        queueOptions: { durable: true },
      },
    });
  }

  public getClient(): ClientProxy {
    return this.client;
  }
}
