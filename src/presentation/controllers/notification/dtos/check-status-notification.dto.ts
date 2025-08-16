import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const checkStatusOutputSchema = z.object({
  status: z.string(),
});

export class CheckStatusOutputDto extends createZodDto(checkStatusOutputSchema) {
  public static fromStatus(status: string): CheckStatusOutputDto {
    return checkStatusOutputSchema.parse({ status: status });
  }
}
