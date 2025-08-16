export abstract class CheckStatusNotificationUseCase {
  abstract execute(input: CheckStatusNotificationUseCase.Input): Promise<CheckStatusNotificationUseCase.Output>;
}

export namespace CheckStatusNotificationUseCase {
  export type Input = { id: string };
  export type Output = string | null;
}
