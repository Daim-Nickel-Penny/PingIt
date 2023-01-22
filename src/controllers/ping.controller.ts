import { Controller, Get } from '@nestjs/common';
import { PingResponse } from 'src/interface/pingResponse.interface';
import { CheckPingService } from 'src/services/checkPing.service';
import { PingService } from 'src/services/ping.service';

@Controller('/ping')
export class PingController {
  constructor(
    private pingService: PingService,
    private checkPingService: CheckPingService,
  ) {}

  @Get('/getstatus')
  async getStatus(): Promise<PingResponse> {
    return this.pingService.pingResponse(2);
  }
}
