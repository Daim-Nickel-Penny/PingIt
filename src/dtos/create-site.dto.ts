import { Length } from 'class-validator';
import { IsString, IsInt } from 'class-validator';
import { EndPoint } from 'src/interface/endPoint.interface';
import { Site } from '../interface/site.interface';
export class CreateSiteDto {
  @IsInt()
  id: number = 0;
  @IsString()
  name: string = '';
  endPointList: EndPoint[] = [];
}
