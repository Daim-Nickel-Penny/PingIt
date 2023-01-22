import { Module } from '@nestjs/common';
import { PingController } from 'src/controllers/ping.controller';
import { CheckPingService } from 'src/services/checkPing.service';
import { PingService } from 'src/services/ping.service';
import { SiteService } from 'src/services/site.service';

@Module({
  controllers: [PingController],
  providers: [PingService, SiteService, CheckPingService],
})
export class PingModule {}
