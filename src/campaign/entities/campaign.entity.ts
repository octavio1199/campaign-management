import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum CampaignStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  EXPIRED = 'expired',
}

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @Column({ name: 'start_date' })
  @ApiProperty()
  startDate: Date;

  @Column({ name: 'end_date' })
  @ApiProperty()
  endDate: Date;

  @Column({
    type: 'enum',
    enum: CampaignStatus,
  })
  @ApiProperty()
  status: CampaignStatus;

  @Column()
  @ApiProperty()
  category: string;

  @Column({ default: false })
  @ApiProperty()
  deleted: boolean;
}
