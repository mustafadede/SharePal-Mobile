type Attached = {
  backdrop: string;
  id: number;
  mediaType: string;
  poster: string;
  releaseDate: string;
  title: string;
};

export type Notification = {
  id: string;
  from: {
    nick: string;
    photo?: string;
    postId?: string;
    uid: string;
    attached?: Attached;
  };
  date: string;
  type: "commentLike" | "suggest" | "like" | "list" | "follow" | "comment";
  isComment: boolean;
  isRead: boolean;
};

export interface NotificationCardProps {
  date: string;
  notificationId: string;
  from: {
    nick: string;
    photo?: string;
    postId?: string;
    uid: string;
    attached?: Attached;
  };
}
