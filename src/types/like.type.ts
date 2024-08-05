import { IModel } from "./base.type"
import { Post } from "./post.type"
import { IUser } from "./user.type"

export interface Like extends IModel {
    Post              : Post   
    author         : IUser
}