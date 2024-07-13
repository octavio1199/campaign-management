import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CampaignController } from '../campaign.controller';
import { CampaignService } from '../campaign.service';
import { mockRequestDto } from './campaign.service.spec';

describe('CampaignController', () => {
  let app: INestApplication;
  const campaignService = {
    findAll: () => ['test'],
    create: () => 'created',
    findOne: () => 'found',
    update: () => 'updated',
    remove: () => 'removed',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CampaignController],
      providers: [
        {
          provide: CampaignService,
          useValue: campaignService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/campaigns (POST)', () => {
    return request(app.getHttpServer())
      .post('/campaigns')
      .send(mockRequestDto)
      .expect(201)
      .expect('created');
  });

  it('/campaigns (GET)', () => {
    return request(app.getHttpServer())
      .get('/campaigns')
      .expect(200)
      .expect(['test']);
  });

  it('/campaigns/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/campaigns/1')
      .expect(200)
      .expect('found');
  });

  it('/campaigns/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/campaigns/1')
      .send(mockRequestDto)
      .expect(200)
      .expect('updated');
  });

  it('/campaigns/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete('/campaigns/1').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
