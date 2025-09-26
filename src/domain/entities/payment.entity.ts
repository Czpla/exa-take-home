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

  public static create(input: Payment.Input): Payment {
    if (input.amount <= 0) {
      throw new Error('Amount must be greater than zero.');
    }

    if (input.cpf.length < 11 || input.cpf.length > 14) {
      throw new Error('CPF must be between 11 and 14 characters.');
    }

    if (input.description.length < 5 || input.description.length > 100) {
      throw new Error('Description must be between 5 and 100 characters.');
    }

    return new Payment(input);
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
