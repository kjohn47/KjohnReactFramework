import { IDictionary } from "../../logic/functions/misc";
import { NotificationRequestType } from "./NotificationEnum";

export interface INotificationItem {
    ID: string;
    Text: IDictionary<string>;
    IsViewed: boolean;
    DetailsRoute?: string;
}

export interface INotifications {
    From: string;
    To: string;
    UnreadCount: number;
    OlderUnreadCount: number;
    Notifications: INotificationItem[];
}

export interface INotificationRequest {
    Type: NotificationRequestType;
    ID?: string;
}

export interface INotificationPostBody {
    ID?: string;
    IsMenu?: boolean;
}

export interface IuseNotificationReturn {
    Notifications?: INotifications,
    Loading: boolean;
    ReadCurrent: (Id?: string, callback?: () => void) => void;
    ReadAll: (callback?: () => void) => void;
    GetNotifications: (callback?: () => void) => void;
    DeleteNotification: (id: string, callback?: () => void) => void;
}