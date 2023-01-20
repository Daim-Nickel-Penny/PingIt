import { EndPoint } from "./endPoint.interface";

export interface Site{
    id:string,
    name:string,
    endPointList:EndPoint[]
}