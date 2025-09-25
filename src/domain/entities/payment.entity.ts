import { PaymentMethod } from '@/domain/enums/payment-method.enum';
import { PaymentStatus } from '@/domain/enums/payment-status.enum';

export class Payment {
  public readonly id: string;
  public readonly cpf: string;
  public readonly description: string;
  public readonly amount: number;
  public readonly paymentMethod: PaymentMethod;
  public readonly status: PaymentStatus;
  public readonly createdAt?: Date = new Date();
  public readonly updatedAt?: Date;

  constructor(input: Payment.Input) {
    this.id = input.id;
    this.cpf = input.cpf;
    this.description = input.description;
    this.amount = input.amount;
    this.paymentMethod = input.paymentMethod;
    this.status = input.status;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }

  public static fromJSON(input: Record<string, any>): Payment {
    return new Payment({
      id: input.id,
      cpf: input.cpf,
      description: input.description,
      amount: input.amount,
      paymentMethod: input.paymentMethod,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });
  }
}

export namespace Payment {
  export interface Input {
    id: string;
    cpf: string;
    description: string;
    amount: number;
    paymentMethod: PaymentMethod;
    status: PaymentStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }
}
