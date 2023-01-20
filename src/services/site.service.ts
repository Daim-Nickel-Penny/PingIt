import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { Site } from 'src/interface/site.interface';
import { EndPoint } from 'src/interface/endPoint.interface';
import { SiteList } from 'src/interface/siteList.interface';

@Injectable()
export class SiteService {
  private sitesData: SiteList = { listOfSite: [] };

  seed(): Promise<SiteList> {
    // use this for local seed test only
    let endPointData: EndPoint[] = [
      { id: 'e1', url: 'www.bdbd.cn/1' },
      { id: 'e2', url: 'www.bdbd.cn/2' },
    ];
    let siteData1: Site;
    let siteData2: Site;
    siteData1 = { id: 's1', name: 's1', endPointList: endPointData };
    siteData2 = { id: 's2', name: 's2', endPointList: endPointData };
    let siteData: Site[] = [siteData1, siteData2];
    return Promise.resolve({ listOfSite: siteData });
  }

  async main(): Promise<void> {
    this.sitesData = await this.seed();
    if (!this.sitesData.listOfSite.length)
      throw new NotFoundException('No Data');
  }

  async findAllSites(): Promise<SiteList> {
    await this.main();

    return this.sitesData;
  }

  async findSiteById(id: string): Promise<Site> {
    await this.main();

    let result: Site[];

    result = this.sitesData.listOfSite.filter((site, key) => site.id === id);

    if (!result.length) throw new HttpException('No Id', 204);
    else return result[0];
  }

  async findAllEndPointsForSite(id: string): Promise<EndPoint[]> {
    await this.main();

    const site: Site = await this.findSiteById(id);

    return site.endPointList;
  }
}
