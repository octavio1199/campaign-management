import { Module } from '@nestjs/common';
import { CampaignModule } from './campaign/campaign.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [DatabaseModule, CampaignModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
