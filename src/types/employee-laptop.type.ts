import { IModel } from "./base.type"

export interface EmployeeLaptop extends IModel {
    firstname       : string
    lastname           : string
    nationalIdentity   : string
    telephone          : string
    email              : string   
    department         : string
    position           : string
    laptopManufacturer : string
    model              : string
    serialNumber     : string
}