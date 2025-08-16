export class Retry {
  public static async execute<T>(fn: () => Promise<T>, retries = 3, delayMs = 1000): Promise<T> {
    let attempt = 0;

    while (attempt < retries) {
      try {
        return await fn();
      } catch (error) {
        attempt++;

        if (attempt >= retries) throw error;

        await new Promise((res) => setTimeout(res, delayMs * attempt));
      }
    }

    throw new Error('Unexpected retry error.');
  }
}
