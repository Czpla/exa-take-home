import { Global, Module } from '@nestjs/common';
import { RabbitMQService } from '@/infrastructure/messaging/rabbitmq/rabbitmq.service';

@Global()
@Module({
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
