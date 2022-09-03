import { Reply } from "./reply";

export interface Tweet {
    tweeetId: string;
    tweetText: string;
    tweetLikesCount: number;
    tweetLikedBy: Array<string>;
    tweetTag: string;
    tweetLiked: boolean;
    tweetedBy: string;
    tweetedAt: Date;
    replies: Array<Reply>;
}
