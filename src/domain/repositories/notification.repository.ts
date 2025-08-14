import { Notification } from '@/domain/entities/notification.entity';
import { NotificationStatus } from '@/domain/enums/notification-status.enum';

export abstract class NotificationRepository {
    public abstract save(input: NotificationRepository.Save.Input): Promise<NotificationRepository.Save.Output>;
    public abstract findAll(): Promise<NotificationRepository.FindAll.Output>;
    public abstract findById(input: NotificationRepository.FindById.Input): Promise<NotificationRepository.FindById.Output>;
    public abstract updateStatus(input: NotificationRepository.UpdateStatus.Input): Promise<NotificationRepository.UpdateStatus.Output>;
}

export namespace NotificationRepository {
    export namespace Save {
        export interface Input {
            notification: Notification;
        }

        export type Output = void;
    }

    export namespace FindAll {
        export type Output = Notification[] | null;
    }

    export namespace FindById {
        export interface Input {
            id: string;
        }

        export type Output = Notification | null;
    }

    export namespace UpdateStatus {
        export interface Input {
            id: string;
            status: NotificationStatus;
        }

        export type Output = void;
    }
}