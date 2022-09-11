import { Reply } from "./reply";
import { User } from "./user";

export interface Tweet {
    tweetId: string;
    tweetText: string;
    tweetLikesCount: number;
    tweetLikedBy: Array<string>;
    tweetTag: string;
    tweetLiked: boolean;
    tweetedBy: string;
    tweetedByUser: User;
    tweetedAt: Date;
    replies: Array<Reply>;
    repliesCount: number;
}
