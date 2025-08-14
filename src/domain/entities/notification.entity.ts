import { NotificationType } from '@/domain/enums/notification-type.enum';
import { NotificationStatus } from '@/domain/enums/notification-status.enum';

export class Notification {
  public readonly id: string;
  public readonly userId: string;
  public readonly message: string;
  public readonly type: NotificationType;
  public readonly createdAt?: Date = new Date();
  public readonly updatedAt?: Date;
  public status: NotificationStatus;

  constructor(input: Notification.Input) {
    this.id = input.id;
    this.userId = input.userId;
    this.message = input.message;
    this.type = input.type;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
    this.status = NotificationStatus.PENDING;
  }

  public static fromJSON(input: Record<string, any>): Notification {
    return new Notification({
      id: input.id,
      userId: input.userId,
      message: input.message,
      type: input.type,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });
  }
}

export namespace Notification {
  export interface Input {
    id: string;
    userId: string;
    message: string;
    type: NotificationType;
    createdAt?: Date;
    updatedAt?: Date;
  }
}
