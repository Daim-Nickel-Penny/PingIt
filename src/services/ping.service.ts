import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EndPoint } from 'src/interface/endPoint.interface';
import { PingResponse } from 'src/interface/pingResponse.interface';
import { Site } from 'src/interface/site.interface';
import { SiteList } from 'src/interface/siteList.interface';
import { CheckPingService } from './checkPing.service';
import { SiteService } from './site.service';
@Injectable()
export class PingService {
  constructor(
    private siteService: SiteService,
    private checkPingService: CheckPingService,
  ) {}

  /**@TODO For now its a bad approach, I will remove it once DB connected */
  private sitesData: SiteList = { listOfSite: [] };

  seed(): Promise<SiteList> {
    // use this for local seed test only
    let endPointData: EndPoint[] = [
      { id: 1, siteId: 2, url: 'https://postman-echo.com/status/200' },
      { id: 2, siteId: 2, url: 'https://postman-echo.com/status/404' },
    ];
    let siteData1: Site;
    let siteData2: Site;
    siteData1 = { id: 1, name: 's1', endPointList: endPointData };
    siteData2 = { id: 2, name: 's2', endPointList: endPointData };
    let siteData: Site[] = [siteData1, siteData2];
    return Promise.resolve({ listOfSite: siteData });
  }

  async main(): Promise<void> {
    this.sitesData = await this.seed();
    if (!this.sitesData.listOfSite.length)
      throw new NotFoundException('No Data');
  }
  /**Bad Code ends here */

  async pingResponse(siteId: number): Promise<PingResponse[]> {
    await this.main();
    let endPointList: EndPoint[] = [];

    this.sitesData.listOfSite.forEach((site) => {
      if (site.id === siteId) {
        endPointList = site.endPointList;
      }
    });

    if (endPointList.length === 0) throw new BadRequestException();
    else return this.checkPingService.getStatus(endPointList, siteId);
  }
}
