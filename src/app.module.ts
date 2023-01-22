import { Module } from '@nestjs/common';
import { PingModule } from './modules/pingModule.module';
import { SiteModule } from './modules/siteModle.module';

@Module({
  imports: [SiteModule, PingModule],
})
export class AppModule {}
