export interface Reply {
    replyId: string;
    replyText: string;
    replyTag: string;
    replyLikesCount: number;
    replyLiked: boolean;
    repliedBy: string;
    repliedAt: Date;
}
