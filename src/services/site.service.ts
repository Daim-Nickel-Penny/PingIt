import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { Site } from 'src/interface/site.interface';
import { EndPoint } from 'src/interface/endPoint.interface';
import { SiteList } from 'src/interface/siteList.interface';
import { CreateSiteDto } from 'src/dtos/create-site.dto';

@Injectable()
export class SiteService {
  private sitesData: SiteList = { listOfSite: [] };

  seed(): Promise<SiteList> {
    // use this for local seed test only
    let endPointData: EndPoint[] = [
      { id: 1, siteId: 1, url: 'www.bdbd.cn/1' },
      { id: 2, siteId: 1, url: 'www.bdbd.cn/2' },
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

  async findAllSites(): Promise<SiteList> {
    await this.main();

    return this.sitesData;
  }

  async findSiteById(id: number): Promise<Site> {
    await this.main();

    let result: Site[];

    result = this.sitesData.listOfSite.filter((site, key) => site.id === id);

    if (!result.length) throw new HttpException('No Id', 204);
    else return result[0];
  }

  async findAllEndPointsForSite(id: number): Promise<EndPoint[]> {
    await this.main();

    const site: Site = await this.findSiteById(id);

    return site.endPointList;
  }

  async addSite(newSite: CreateSiteDto): Promise<CreateSiteDto> {
    await this.main();

    if (JSON.stringify(newSite) === '{}')
      throw new HttpException('Request Body Is Empty', 400);

    this.sitesData.listOfSite.push(newSite);
    return newSite;
  }
}
