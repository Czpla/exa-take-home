export abstract class PaymentStrategy {
  abstract process(input: PaymentStrategy.Input): Promise<PaymentStrategy.Output>;
}

export namespace PaymentStrategy {
  export type Input = {
    id: string;
    cpf: string;
    description: string;
    amount: number;
    paymentMethod: string;
  };

  export type Output = {
    id: string | null;
    paymentLink: string | null;
  };
}
