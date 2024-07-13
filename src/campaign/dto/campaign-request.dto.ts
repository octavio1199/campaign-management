import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsString } from 'class-validator';
import { CampaignStatus } from '../entities/campaign.entity';

export class CampaignRequestDto {
  @ApiProperty({ example: 'Campaigns DTO' })
  @IsString()
  name: string;

  @ApiProperty({
    example: '2024-07-13T00:00:00.000Z',
  })
  @IsDate()
  startDate: Date;

  @ApiProperty({
    example: '2024-07-15T00:00:00.000Z',
  })
  @IsDate()
  endDate: Date;

  @ApiProperty({ example: 'active' })
  @IsEnum(CampaignStatus)
  status: CampaignStatus;

  @ApiProperty({ example: 'marketing' })
  @IsString()
  category: string;
}
