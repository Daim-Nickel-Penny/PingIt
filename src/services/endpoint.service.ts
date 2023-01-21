import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { CreateEndpointDto } from 'src/dtos/create-endpoint.dto';
import { EndPoint } from 'src/interface/endPoint.interface';
import { Site } from 'src/interface/site.interface';
import { SiteList } from 'src/interface/siteList.interface';
import { SiteService } from './site.service';

@Injectable()
export class EndpointService {
  constructor(private siteService: SiteService) {}

  /**@TODO For now its a bad approach, I will remove it once DB connected */
  private sitesData: SiteList = { listOfSite: [] };

  seed(): Promise<SiteList> {
    // use this for local seed test only
    let endPointData: EndPoint[] = [
      { id: 1, siteId: 2, url: 'www.bdbd.cn/1' },
      { id: 2, siteId: 2, url: 'www.bdbd.cn/2' },
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
  async addEndpoint(newEndpoint: CreateEndpointDto): Promise<EndPoint> {
    await this.main();

    let siteId: number = newEndpoint.siteId;
    let found: boolean = false;
    this.sitesData.listOfSite.forEach((site) => {
      if (site.id === siteId) {
        site.endPointList.push(newEndpoint);
        found = true;
      }
    });

    if (!found) throw new HttpException('No matching site id', 404);
    else return newEndpoint;
  }
}
