import { IModel } from "./base.type"
import { Post } from "./post.type"
import { IUser } from "./user.type"

export interface Comment extends IModel {
    comment       : string
    Post              : Post   
    author         : IUser
}