import { ConfigService } from '@nestjs/config';

export class Environment {
  constructor(private readonly config: ConfigService) {}

  public get port(): number {
    return this.config.get<number>('PORT', 3000);
  }

  public get databaseUrl(): string {
    return this.config.get<string>('DATABASE_URL', 'postgres://localhost:5432');
  }

  public get mercadoPagoAccessToken(): string {
    return this.config.get<string>('MERCADO_PAGO_ACCESS_TOKEN', '');
  }

  public get mercadoPagoNotificationUrl(): string {
    return this.config.get<string>('MERCADO_PAGO_NOTIFICATION_URL', '');
  }

  public get mercadoPagoBackUrls(): { success: string; failure: string; pending: string } {
    return {
      success: this.config.get<string>('MERCADO_PAGO_BACK_URL_SUCCESS', 'https://meusite.com/success'),
      failure: this.config.get<string>('MERCADO_PAGO_BACK_URL_FAILURE', 'https://meusite.com/failure'),
      pending: this.config.get<string>('MERCADO_PAGO_BACK_URL_PENDING', 'https://meusite.com/pending'),
    };
  }

  public get mercadoPagoAutoReturn(): 'all' | 'approved' | 'none' {
    return this.config.get<'all' | 'approved' | 'none'>('MERCADO_PAGO_AUTO_RETURN', 'approved');
  }
}
