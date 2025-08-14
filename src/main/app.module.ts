import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Environment } from '@/main/config/environment/environment.config';
import { PrismaModule } from '@/infrastructure/database/prisma/prisma.module';
import { NotificationModule } from '@/presentation/controllers/notification/notification.module';
import { RabbitMQModule } from '@/infrastructure/messaging/rabbitmq/rabbitmq.module';
import { EnvironmentModule } from '@/main/config/environment/environment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EnvironmentModule,
    PrismaModule,
    RabbitMQModule,
    NotificationModule,
  ],
})
export class AppModule {}
