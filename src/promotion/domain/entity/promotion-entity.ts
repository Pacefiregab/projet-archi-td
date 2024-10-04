import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface CreatePromotionEntity {
  name: string;
  code: string;
  amount?: number;
}

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column('decimal', { default: 1500 })
  amount: number;

  constructor(promotion: CreatePromotionEntity) {
    if (!promotion) {
      return;
    }

    if (!promotion.name || !promotion.code) {
      throw new Error('Promotion name and code are required.');
    }

    this.name = promotion.name;
    this.code = promotion.code;
    this.amount = promotion.amount ?? 1500;
  }

  updatePromotion(name: string, code: string, amount?: number) {
    if (!name || !code) {
      throw new Error('Promotion name and code are required.');
    }

    this.name = name;
    this.code = code;
    this.amount = amount ?? this.amount;
  }
}
