import { Controller, Get, HttpException, ParseIntPipe } from '@nestjs/common';
import { Body, HttpCode, Param, Post } from '@nestjs/common/decorators';
import { Review } from '@prisma/client';
import { CreateEndpointDto } from 'src/dtos/create-endpoint.dto';
import { CreateSiteDto } from 'src/dtos/create-site.dto';
import { EndPoint } from 'src/interface/endPoint.interface';
import { Site } from 'src/interface/site.interface';
import { SiteList } from 'src/interface/siteList.interface';
import { PrismaService } from 'src/prisma.service';
import { EndpointService } from 'src/services/endpoint.service';
import { SiteService } from 'src/services/site.service';

interface reviewInterface {
  id: number;
  name: string;
}
@Controller()
export class SiteController {
  constructor(
    private siteService: SiteService,
    private endpointService: EndpointService,
    private prismaService: PrismaService,
  ) {}

  @Get('')
  async welcome(): Promise<string> {
    return '<h1>Welcome To Ping</h1> <h3>Visit other end points for Data</h3>';
  }

  @Get('/allsites')
  async findAllSites(): Promise<SiteList> {
    const result: SiteList = await this.siteService.findAllSites();

    return result;
  }

  @Get('/sitebyid/:id')
  async findSiteById(@Param('id', ParseIntPipe) id: number): Promise<Site> {
    const result: Site = await this.siteService.findSiteById(id);

    return result;
  }

  @Get('/allendpoints/:id')
  async findAllEndPointsForSite(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EndPoint[]> {
    const endPointData: EndPoint[] =
      await this.siteService.findAllEndPointsForSite(id);

    return endPointData;
  }

  @Post('/addsite')
  async addSite(@Body() newSite: CreateSiteDto): Promise<CreateSiteDto> {
    let result: CreateSiteDto = await this.siteService.addSite(newSite);
    if (!result) throw new HttpException('Data could not be added', 500);
    return result;
  }

  @Post('/addendpoint')
  async addEndpoint(
    @Body() newEndpoint: CreateEndpointDto,
  ): Promise<CreateEndpointDto> {
    let result: CreateEndpointDto = await this.endpointService.addEndpoint(
      newEndpoint,
    );
    if (!result) throw new HttpException('Data could not be added', 500);
    return result;
  }

  @Get('/review')
  async getAllReview(): Promise<Review[]> {
    return this.prismaService.review.findMany();
  }
}
