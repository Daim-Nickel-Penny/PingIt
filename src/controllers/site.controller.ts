import { Controller, Get, NotFoundException } from '@nestjs/common';
import { HttpCode, Param } from '@nestjs/common/decorators';
import e from 'express';
import { EndPoint } from 'src/interface/endPoint.interface';
import { Site } from 'src/interface/site.interface';
import { SiteList } from 'src/interface/siteList.interface';
import { SiteService } from 'src/services/site.service';

@Controller()
export class SiteController {
  constructor(private siteService: SiteService) {}

  @Get('')
  async welcome(): Promise<string> {
    return '<h1>Welcome To Ping</h1> <h3>Visit other end points for Data</h3>';
  }

  @Get('/allSites')
  async findAllSites(): Promise<SiteList> {
    const result: SiteList = await this.siteService.findAllSites();

    return result;
  }

  @Get('/siteById/:id')
  async findSiteById(@Param('id') id: string): Promise<Site> {
    const result: Site = await this.siteService.findSiteById(id);

    return result;
  }

  @Get('/allEndPoints/:id')
  async findAllEndPointsForSite(@Param('id') id: string): Promise<EndPoint[]> {
    const endPointData: EndPoint[] =
      await this.siteService.findAllEndPointsForSite(id);

    return endPointData;
  }
}
