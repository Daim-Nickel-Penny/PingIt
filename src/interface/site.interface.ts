import { EndPoint } from './endPoint.interface';

export interface Site {
  id: number;
  name: string;
  endPointList: EndPoint[];
}
