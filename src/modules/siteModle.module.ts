import { Module } from '@nestjs/common';
import { SiteController } from 'src/controllers/site.controller';
import { PrismaService } from 'src/prisma.service';
import { EndpointService } from 'src/services/endpoint.service';
import { SiteService } from 'src/services/site.service';

@Module({
  controllers: [SiteController],
  providers: [SiteService, EndpointService, PrismaService],
  exports: [SiteService],
})
export class SiteModule {}
