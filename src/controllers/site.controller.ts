import { Controller, Get, NotFoundException } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
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
    return this.siteService.findAllSites();
  }

  @Get('/siteById/:id')
  async findSiteById(@Param('id') id: string): Promise<Site> {
    const site: Site = await this.siteService.findSiteById(id);
    if (!site) throw new NotFoundException('No Matching Id');
    else return this.siteService.findSiteById(id);
  }

  @Get('/allEndPoints/:id')
  async findAllEndPointsForSite(@Param('id') id: string): Promise<EndPoint[]> {
    const endPointData: EndPoint[] =
      await this.siteService.findAllEndPointsForSite(id);
    if (!endPointData) throw new NotFoundException('No End Points available');
    else return endPointData;
  }
}
