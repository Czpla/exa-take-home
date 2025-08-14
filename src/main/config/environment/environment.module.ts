import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Environment } from '@/main/config/environment/environment.config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: Environment,
      useFactory: (config: ConfigService) => new Environment(config),
      inject: [ConfigService],
    },
  ],
  exports: [Environment],
})
export class EnvironmentModule {}
