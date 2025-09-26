export abstract class ProcessPaymentUseCase {
  abstract execute(input: ProcessPaymentUseCase.Input): Promise<ProcessPaymentUseCase.Output>;
}

export namespace ProcessPaymentUseCase {
  export type Input = { externalId: string };
  export type Output = void;
}
