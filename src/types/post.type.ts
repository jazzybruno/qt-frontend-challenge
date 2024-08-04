import { IModel } from "./base.type"
import { IUser } from "./user.type"

export interface Post extends IModel {
    imagePath       : string
    title           : string
    content   : string
    numberOfComments          : number
    numberOfLikes              : number   
    author         : IUser
}