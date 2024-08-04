import { IModel } from "./base.type"
import { IUser } from "./user.type"

export interface Post extends IModel {
    comment       : string
    Post              : Post   
    author         : IUser
}