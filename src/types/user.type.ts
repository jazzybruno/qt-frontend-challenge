import { IModel } from "./base.type";

export interface IUser extends IModel {
    firstName:       string;
    lastName:       string;
    telephone:       string;
    fullName:       string;
    dateOfBirth:       string;
    username:       string;
    password:    string;
    email:          string;
}

