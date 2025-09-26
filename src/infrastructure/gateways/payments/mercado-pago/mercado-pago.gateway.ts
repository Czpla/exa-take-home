import { PaymentGateway } from '@/domain/gateways/payment.gateway';
import { Environment } from '@/main/config/environment/environment.config';
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaymentStatus } from '@/domain/enums/payment-status.enum';

@Injectable()
export class MercadoPagoGateway implements PaymentGateway {
  private readonly _preference: Preference;
  private readonly _paymentService: Payment;

  constructor(private readonly environment: Environment) {
    const client = new MercadoPagoConfig({
      accessToken: this.environment.mercadoPagoAccessToken,
    });

    this._preference = new Preference(client);
    this._paymentService = new Payment(client);
  }

  public async createPaymentLink(
    input: PaymentGateway.CreatePaymentLink.Input,
  ): Promise<PaymentGateway.CreatePaymentLink.Output> {
    try {
      const response = await this._preference.create({
        body: {
          items: input.items.map((item) => ({
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            unit_price: item.unit_price,
          })),
          back_urls: {
            success: this.environment.mercadoPagoBackUrls.success,
            failure: this.environment.mercadoPagoBackUrls.failure,
            pending: this.environment.mercadoPagoBackUrls.pending,
          },
          external_reference: input.localId,
          auto_return: this.environment.mercadoPagoAutoReturn,
          notification_url: this.environment.mercadoPagoNotificationUrl,
        },
      });

      if (!response.id || !response.init_point) {
        throw new InternalServerErrorException('Failed to create payment link with Mercado Pago.');
      }

      return {
        id: response.id,
        url: response.init_point,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create payment link with Mercado Pago. Please try again.');
    }
  }

  public async verifyPayment(input: PaymentGateway.VerifyPayment.Input): Promise<PaymentGateway.VerifyPayment.Output> {
    try {
      const paymentResponse = await this._paymentService.get({ id: input.externalId });

      if (!paymentResponse.status) {
        throw new InternalServerErrorException(
          `Payment ID ${input.externalId}: Missing critical 'status' field in Mercado Pago response.`,
        );
      }

      if (!paymentResponse.external_reference) {
        throw new InternalServerErrorException(
          `Payment ID ${input.externalId}: Missing required 'external_reference' field.`,
        );
      }

      const status = this._mapMercadoPagoStatusToDomain(paymentResponse.status);

      return {
        status: status,
        localId: paymentResponse.external_reference,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to verify payment with Mercado Pago for ID: ${input.externalId}. Please try again.`,
      );
    }
  }

  private _mapMercadoPagoStatusToDomain(status: string): PaymentStatus {
    switch (status) {
      case 'pending':
      case 'in_process':
        return PaymentStatus.PENDING;
      case 'approved':
        return PaymentStatus.PAID;
      case 'rejected':
      case 'cancelled':
      case 'refunded':
      case 'charged_back':
        return PaymentStatus.FAIL;
      default:
        return PaymentStatus.FAIL;
    }
  }
}
