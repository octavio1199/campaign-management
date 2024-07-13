import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampaignRequestDto } from './dto/campaign-request.dto';
import { Campaign, CampaignStatus } from './entities/campaign.entity';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private campaignsRepository: Repository<Campaign>,
  ) {}

  async create(request: CampaignRequestDto): Promise<Campaign> {
    this.validateRequest(request);

    const campaign = await this.campaignsRepository.create(request);
    return await this.campaignsRepository.save(campaign);
  }

  async findAll(): Promise<Campaign[]> {
    return await this.campaignsRepository.find({ where: { deleted: false } });
  }

  async findOne(id: number): Promise<Campaign> {
    const campaign = await this.campaignsRepository.findOneBy({ id });

    if (!campaign) throw new NotFoundException('Campaign not found');

    return campaign;
  }

  async update(id: number, request: CampaignRequestDto): Promise<Campaign> {
    this.validateRequest(request);

    const campaign = await this.findOne(id);
    await this.campaignsRepository.update(campaign.id, request);

    return await this.findOne(id);
  }

  async remove(id: number) {
    const campaign = await this.findOne(id);
    campaign.deleted = true;

    await this.campaignsRepository.save(campaign);
  }

  private validateRequest(request: CampaignRequestDto) {
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);

    if (endDate <= startDate)
      throw new BadRequestException(
        'The end date must be greater than the start date',
      );

    const today = new Date().setHours(0, 0, 0, 0);
    if (startDate.setHours(0, 0, 0) < today)
      throw new BadRequestException(
        'The start date must be greater than the current date',
      );

    if (endDate < new Date()) request.status = CampaignStatus.EXPIRED;
  }
}
