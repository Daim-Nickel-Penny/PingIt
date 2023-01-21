import { Module } from '@nestjs/common';
import { SiteService } from 'src/services/site.service';

@Module({
  controllers: [],
  providers: [SiteService],
})
export class PingModule {}
