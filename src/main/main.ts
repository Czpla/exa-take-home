import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/main/app.module';
import { Environment } from '@/main/config/environment/environment.config';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ZodValidationPipe());

  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const environment = new Environment(configService);

  await app.listen(environment.port);
}

bootstrap();
