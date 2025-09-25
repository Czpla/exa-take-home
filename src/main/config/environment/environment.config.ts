import { ConfigService } from '@nestjs/config';

export class Environment {
  constructor(private readonly config: ConfigService) {}

  public get port(): number {
    return this.config.get<number>('PORT', 3000);
  }

  public get databaseUrl(): string {
    return this.config.get<string>('DATABASE_URL', 'postgres://localhost:5432');
  }
}
