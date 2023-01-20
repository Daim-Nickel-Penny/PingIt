import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SiteModule } from './modules/siteModle.module';

@Module({
  imports: [SiteModule],
})
export class AppModule {}
