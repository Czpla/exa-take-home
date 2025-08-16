import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/main/app.module';
import { Environment } from '@/main/config/environment/environment.config';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const environment = new Environment(configService);

  app.useGlobalPipes(new ZodValidationPipe());

  app.setGlobalPrefix('api');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [environment.rabbitmqUrl],
      queue: environment.rabbitmqQueueEvents,
      routingKey: 'notifications',
      queueOptions: { durable: true },
      noAck: false,
    },
  });

  await app.startAllMicroservices();
  await app.listen(environment.port);
}

bootstrap();
