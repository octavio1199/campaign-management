import { Test, TestingModule } from '@nestjs/testing';
import { CampaignService } from '../campaign.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Campaign, CampaignStatus } from '../entities/campaign.entity';
import { Repository } from 'typeorm';
import { CampaignRequestDto } from '../dto/campaign-request.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// #region Mocks
export const mockRequestDto: CampaignRequestDto = {
  name: 'Campaign 1',
  startDate: new Date('2024-08-20'),
  endDate: new Date('2024-08-25'),
  status: CampaignStatus.ACTIVE,
  category: 'marketing',
};

const mockCampaignList: Campaign[] = [
  {
    id: 1,
    name: 'Campaign 1',
    startDate: new Date('2024-08-20'),
    endDate: new Date('2024-08-25'),
    status: CampaignStatus.ACTIVE,
    category: 'marketing',
    createdAt: new Date(),
    deleted: false,
  },
  {
    id: 2,
    name: 'Campaign 2',
    startDate: new Date('2024-08-20'),
    endDate: new Date('2024-08-25'),
    status: CampaignStatus.ACTIVE,
    category: 'marketing',
    createdAt: new Date(),
    deleted: false,
  },
];
// #endregion

describe('CampaignService', () => {
  let service: CampaignService;
  let mockRepository: Partial<Record<keyof Repository<Campaign>, jest.Mock>>;
  let campaigns: Campaign[] = [];

  beforeEach(async () => {
    campaigns = mockCampaignList;

    mockRepository = {
      create: jest.fn().mockImplementation((campaignDto) => campaignDto),
      save: jest.fn().mockImplementation(async (campaign) => {
        const index = campaigns.findIndex((c) => c.id === campaign.id);
        if (index > -1) {
          campaigns[index] = campaign;
        } else {
          campaign.id = campaigns.length + 1;
          campaigns.push(campaign);
        }
        return campaign;
      }),
      find: jest.fn().mockImplementation(async () => campaigns),
      findOneBy: jest
        .fn()
        .mockImplementation(async ({ id }) =>
          campaigns.find((c) => c.id === id),
        ),
      update: jest.fn().mockImplementation(async (id, campaignUpdate) => {
        const index = campaigns.findIndex((c) => c.id === id);
        if (index > -1) {
          campaigns[index] = { ...campaigns[index], ...campaignUpdate };
          return campaigns[index];
        }
        return null;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignService,
        {
          provide: getRepositoryToken(Campaign),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CampaignService>(CampaignService);
  });

  describe('create', () => {
    it('should create a campaign successfully and return the created campaign', async () => {
      const createdCampaign = { ...mockRequestDto, id: 3 };

      const result = await service.create(mockRequestDto);
      expect(mockRepository.create).toHaveBeenCalledWith(mockRequestDto);
      expect(mockRepository.save).toHaveBeenCalledWith(createdCampaign);
      expect(result).toEqual(createdCampaign);
    });

    it('should throw BadRequestException if end date is less than or equal to start date', async () => {
      const request = {
        ...mockRequestDto,
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-01-01'),
      };
      await expect(service.create(request)).rejects.toThrow(
        new BadRequestException(
          'The end date must be greater than the start date',
        ),
      );
    });

    it('should create an expired campaign if start date is less than current date', async () => {
      const request = {
        ...mockRequestDto,
        startDate: new Date('2020-01-01'),
        endDate: new Date('2023-01-02'),
      };
      await expect(service.create(request)).rejects.toThrow(
        new BadRequestException(
          'The start date must be greater than the current date',
        ),
      );
    });
  });

  describe('findAll', () => {
    it('should return all campaigns', async () => {
      const campaigns = [
        { id: '1', name: 'Campaign 1' },
        { id: '2', name: 'Campaign 2' },
      ];
      mockRepository.find.mockResolvedValue(campaigns);

      const result = await service.findAll();
      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(campaigns);
    });
  });

  describe('findOne', () => {
    it('should return a single campaign by id', async () => {
      const campaign = { id: '1', name: 'Campaign 1' };
      mockRepository.findOneBy.mockResolvedValue(campaign);

      const result = await service.findOne(1);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(campaign);
    });

    it('should throw NotFoundException if campaign not found', async () => {
      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValueOnce(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a campaign successfully', async () => {
      const campaignUpdate = {
        ...campaigns[0],
        name: 'Updated Campaign',
      };

      const result = await service.update(1, campaignUpdate);
      expect(mockRepository.update).toHaveBeenCalledWith(1, campaignUpdate);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(campaignUpdate);
    });
  });

  describe('remove', () => {
    it('should mark a campaign as deleted successfully', async () => {
      await service.remove(2);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 2 });
      expect(mockRepository.save).toHaveBeenCalledWith({
        ...campaigns[1],
        deleted: true,
      });
      const deletedCampaign = campaigns.find((c) => c.id === campaigns[1].id);
      expect(deletedCampaign.deleted).toBe(true);
    });
  });
});
