import { Controller, Post, Body, UsePipes, Param, Patch, Get } from '@nestjs/common';
import {
  CreatePaymentInputDto,
  CreatePaymentInputSchema,
  CreatePaymentOutputDto,
  UpdatePaymentInputDto,
  UpdatePaymentInputSchema,
} from '@/presentation/controllers/payment/dtos';
import { ZodValidationPipe } from 'nestjs-zod';
import { CreatePaymentUseCase } from '@/domain/usecases/create-payment.usecase';
import { UpdatePaymentUseCase } from '@/domain/usecases/update-payment.usecase';
import { FindPaymentByIdOutputDto } from './dtos/find-payment-by-id';
import { FindPaymentByIdUseCase } from '@/domain/usecases/find-payment-by-id.usecase';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly _createPaymentUseCase: CreatePaymentUseCase,
    private readonly _updatePaymentUseCase: UpdatePaymentUseCase,
    private readonly _findPaymentByIdUseCase: FindPaymentByIdUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreatePaymentInputSchema))
  public async send(@Body() body: CreatePaymentInputDto): Promise<CreatePaymentOutputDto> {
    const payment = await this._createPaymentUseCase.execute({
      cpf: body.cpf,
      description: body.description,
      amount: body.amount,
      paymentMethod: body.paymentMethod,
    });

    return CreatePaymentOutputDto.fromEntity(payment);
  }

  @Patch(':id')
  @UsePipes(ZodValidationPipe)
  public async update(@Param('id') id: string, @Body() body: UpdatePaymentInputDto): Promise<void> {
    return await this._updatePaymentUseCase.execute({
      id: id,
      status: body.status,
    });
  }

  // @Get()
  // public async findAll(): Promise<FindAllOutputDto[] | null> {
  //   const notifications = await this._findAllNotificationUseCase.execute();

  //   if (!notifications) {
  //     return null;
  //   }

  //   return notifications.map((notification) => FindAllOutputDto.fromEntity(notification));
  // }

  @Get(':id')
  public async findById(@Param('id') id: string): Promise<FindPaymentByIdOutputDto | null> {
    const payment = await this._findPaymentByIdUseCase.execute({ id: id });

    return FindPaymentByIdOutputDto.fromEntity(payment);
  }

  // @Get('status/:id')
  // public async checkStatus(@Param('id') id: string): Promise<CheckStatusOutputDto | null> {
  //   const notificationStatus = await this._checkStatusNotificationUseCase.execute({ id: id });

  //   if (!notificationStatus) {
  //     throw new NotFoundException(`Notification with id ${id} not found.`);
  //   }

  //   return CheckStatusOutputDto.fromStatus(notificationStatus);
  // }
}
