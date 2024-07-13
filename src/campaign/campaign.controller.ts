import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignRequestDto } from './dto/campaign-request.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Campaign } from './entities/campaign.entity';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @ApiOkResponse({ status: 201, type: Campaign })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  create(@Body() request: CampaignRequestDto) {
    return this.campaignService.create(request);
  }

  @Get()
  @ApiOkResponse({ type: [Campaign] })
  findAll() {
    return this.campaignService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Campaign })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string) {
    return this.campaignService.findOne(+id);
  }

  @Put(':id')
  @ApiOkResponse({ type: Campaign })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  update(@Param('id') id: string, @Body() request: CampaignRequestDto) {
    return this.campaignService.update(+id, request);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Resource not found' })
  remove(@Param('id') id: string) {
    return this.campaignService.remove(+id);
  }
}
