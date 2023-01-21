import { Module } from '@nestjs/common';
import { SiteController } from 'src/controllers/site.controller';
import { EndpointService } from 'src/services/endpoint.service';
import { SiteService } from 'src/services/site.service';

@Module({
  controllers: [SiteController],
  providers: [SiteService, EndpointService],
  exports: [SiteService],
})
export class SiteModule {}
