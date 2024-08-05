import { IModel } from "./base.type"
import { Comment } from "./comment.type"
import { Post } from "./post.type"
import { IUser } from "./user.type"

export interface Report extends IModel {
    author           : IUser
    post   :     Post
    comment      : Comment
    title              :string   
    description         : string
}