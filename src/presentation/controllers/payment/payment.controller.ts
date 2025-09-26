import { Controller, Post, Body, UsePipes, Param, Patch, Get, Query } from '@nestjs/common';
import {
  CreatePaymentInputDto,
  createPaymentInputSchema,
  CreatePaymentOutputDto,
  UpdatePaymentInputDto,
  ListPaymentPaginatedInputDto,
  listPaymentPaginatedInputSchema,
  ListPaymentPaginatedOutputDto,
} from '@/presentation/controllers/payment/dtos';
import { ZodValidationPipe } from 'nestjs-zod';
import { CreatePaymentUseCase } from '@/domain/usecases/create-payment.usecase';
import { UpdatePaymentUseCase } from '@/domain/usecases/update-payment.usecase';
import { FindPaymentByIdOutputDto } from '@/presentation/controllers/payment/dtos/find-payment-by-id.dto';
import { FindPaymentByIdUseCase } from '@/domain/usecases/find-payment-by-id.usecase';
import { ListPaymentsPaginatedUseCase } from '@/domain/usecases/list-payments-paginated.usecase';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly _createPaymentUseCase: CreatePaymentUseCase,
    private readonly _updatePaymentUseCase: UpdatePaymentUseCase,
    private readonly _findPaymentByIdUseCase: FindPaymentByIdUseCase,
    private readonly _listPaymentsPaginated: ListPaymentsPaginatedUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPaymentInputSchema))
  public async send(@Body() body: CreatePaymentInputDto): Promise<CreatePaymentOutputDto> {
    return await this._createPaymentUseCase.execute({
      cpf: body.cpf,
      description: body.description,
      amount: body.amount,
      paymentMethod: body.paymentMethod,
    });
  }

  @Patch(':id')
  @UsePipes(ZodValidationPipe)
  public async update(@Param('id') id: string, @Body() body: UpdatePaymentInputDto): Promise<void> {
    return await this._updatePaymentUseCase.execute({
      id: id,
      status: body.status,
    });
  }

  @Get(':id')
  public async findById(@Param('id') id: string): Promise<FindPaymentByIdOutputDto | null> {
    const payment = await this._findPaymentByIdUseCase.execute({ id: id });

    return FindPaymentByIdOutputDto.fromEntity(payment);
  }

  @Get()
  @UsePipes(new ZodValidationPipe(listPaymentPaginatedInputSchema))
  public async listPaginated(
    @Query() query: ListPaymentPaginatedInputDto,
  ): Promise<ListPaymentPaginatedOutputDto[] | null> {
    const payments = await this._listPaymentsPaginated.execute({
      cpf: query.cpf,
      paymentMethod: query.paymentMethod,
      skip: query.skip,
      take: query.take,
    });

    if (!payments) {
      return null;
    }

    return payments.map((payment) => ListPaymentPaginatedOutputDto.fromEntity(payment));
  }
}
