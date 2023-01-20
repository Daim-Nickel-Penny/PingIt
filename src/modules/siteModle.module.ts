import { Module } from "@nestjs/common";
import { SiteController } from "src/controllers/site.controller";
import { SiteService } from "src/services/site.service";

@Module({
    controllers:[SiteController],
    providers:[SiteService]
})
export class SiteModule{}