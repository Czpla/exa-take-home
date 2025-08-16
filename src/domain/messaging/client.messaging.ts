export abstract class ClientMessaging {
  public abstract emit<T>(pattern: string, data: T): Promise<void>;
  public abstract send<T, R>(pattern: string, data: T): Promise<R>;
}
