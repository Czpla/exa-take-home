import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { SendNotificationUseCase } from '@/domain/usecases/send-notification.usecase';
import { SendInputDto, SendInputSchema } from '@/presentation/controllers/notification/dtos/send-notification.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly _sendNotificationUseCase: SendNotificationUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(SendInputSchema))
  public async send(@Body() body: SendInputDto): Promise<void> {
    return this._sendNotificationUseCase.execute({
      userId: body.userId,
      message: body.message,
      type: body.type,
    });
  }
}
