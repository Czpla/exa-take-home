import { Controller, Post, Body, UsePipes, Get, Param, NotFoundException } from '@nestjs/common';
import { SendNotificationUseCase } from '@/domain/usecases/send-notification.usecase';
import {
  SendInputDto,
  sendInputSchema,
  FindAllOutputDto,
  FindByIdOutputDto,
  CheckStatusOutputDto,
} from '@/presentation/controllers/notification/dtos';
import { ZodValidationPipe } from 'nestjs-zod';
import { FindAllNotificationUseCase } from '@/domain/usecases/find-all-notification.usecase';
import { FindByIdNotificationUseCase } from '@/domain/usecases/find-by-id-notification.usecase';
import { CheckStatusNotificationUseCase } from '@/domain/usecases/check-status-notification.usecase';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly _sendNotificationUseCase: SendNotificationUseCase,
    private readonly _findAllNotificationUseCase: FindAllNotificationUseCase,
    private readonly _findByIdNotificationUseCase: FindByIdNotificationUseCase,
    private readonly _checkStatusNotificationUseCase: CheckStatusNotificationUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(sendInputSchema))
  public async send(@Body() body: SendInputDto): Promise<void> {
    return this._sendNotificationUseCase.execute({
      userId: body.userId,
      message: body.message,
      type: body.type,
    });
  }

  @Get()
  public async findAll(): Promise<FindAllOutputDto[] | null> {
    const notifications = await this._findAllNotificationUseCase.execute();

    if (!notifications) {
      return null;
    }

    return notifications.map((notification) => FindAllOutputDto.fromEntity(notification));
  }

  @Get(':id')
  public async findById(@Param('id') id: string): Promise<FindByIdOutputDto | null> {
    const notification = await this._findByIdNotificationUseCase.execute({ id: id });

    if (!notification) {
      throw new NotFoundException(`Notification with id ${id} not found.`);
    }

    return FindByIdOutputDto.fromEntity(notification);
  }

  @Get('status/:id')
  public async checkStatus(@Param('id') id: string): Promise<CheckStatusOutputDto | null> {
    const notificationStatus = await this._checkStatusNotificationUseCase.execute({ id: id });

    if (!notificationStatus) {
      throw new NotFoundException(`Notification with id ${id} not found.`);
    }

    return CheckStatusOutputDto.fromStatus(notificationStatus);
  }
}
