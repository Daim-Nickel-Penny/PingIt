import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PingResponse } from 'src/interface/pingResponse.interface';
import { CheckPingService } from 'src/services/checkPing.service';
import { PingService } from 'src/services/ping.service';

@Controller('/ping')
export class PingController {
  constructor(
    private pingService: PingService,
    private checkPingService: CheckPingService,
  ) {}

  @Get('/getstatus/:id')
  async getStatus(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PingResponse[]> {
    let result: PingResponse[] = await this.pingService.pingResponse(id);
    return result;
  }
}
