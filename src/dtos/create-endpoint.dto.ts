import { IsString, IsInt } from 'class-validator';

export class CreateEndpointDto {
  @IsInt()
  id: number = 0;
  @IsInt()
  siteId: number = 0;
  @IsString()
  url: string = '';
}
