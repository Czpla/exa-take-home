import { ConfigService } from '@nestjs/config';

export class Environment {
  constructor(private readonly config: ConfigService) {}

  public get port(): number {
    return this.config.get<number>('PORT', 3000);
  }

  public get databaseUrl(): string {
    return this.config.get<string>('DATABASE_URL', 'postgres://localhost:5432');
  }

  public get rabbitmqUrl(): string {
    return this.config.get<string>('RABBITMQ_URL', 'amqp://rabbitmq:rabbitmq@localhost:5672');
  }

  public get rabbitmqQueueEvents(): string {
    return this.config.get<string>('RABBITMQ_QUEUE_EVENTS', 'my_queue');
  }
}
