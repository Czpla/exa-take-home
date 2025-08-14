import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@/domain/repositories/notification.repository';
import { Notification } from '@/domain/entities/notification.entity';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
    constructor(private readonly _prismaService: PrismaService) {}

    public async save(input: NotificationRepository.Save.Input): Promise<NotificationRepository.Save.Output> {
        await this._prismaService.notification.create({
            data: {
                userId: input.notification.userId,
                message: input.notification.message,
                type: input.notification.type,
                createdAt: input.notification.createdAt,
                status: input.notification.status,
            },
        });
    }

    public async findAll(): Promise<NotificationRepository.FindAll.Output> {
        const notifications = await this._prismaService.notification.findMany();

        if (notifications.length === 0) {
            return null;
        }

        return notifications.map(notification => Notification.fromJSON(notification));
    }

    public async findById(input: NotificationRepository.FindById.Input): Promise<NotificationRepository.FindById.Output> {
        const notification = await this._prismaService.notification.findUnique({ where: { id: input.id } });

        if (!notification) {
            return null;
        }

        return Notification.fromJSON(notification);
    }

    public async updateStatus(input: NotificationRepository.UpdateStatus.Input): Promise<NotificationRepository.UpdateStatus.Output> {
        await this._prismaService.notification.update({ where: { id: input.id }, data: { status: input.status } });
    }
}
