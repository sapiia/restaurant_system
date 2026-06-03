import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { MenuItem } from './MenuItem.js';
import { Category } from './Category.js';

export enum PromotionType {
  PERCENT       = 'PERCENT',        // 20% off
  FIXED         = 'FIXED',          // $2 off
  BUY_X_GET_Y   = 'BUY_X_GET_Y',   // buy 2 get 1 free
  FREE_ITEM     = 'FREE_ITEM',      // buy main course get free drink
}

@Entity('promotions')
export class Promotion {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'enum', enum: PromotionType })
  type!: PromotionType;

  // for PERCENT: discount value e.g. 20 = 20%
  // for FIXED: discount amount e.g. 2 = $2 off
  // for BUY_X_GET_Y: X value
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discount_value!: number | null;

  // buy this item/category to trigger promotion
  @Column({ type: 'int', nullable: true })
  buy_item_id!: number | null;

  @ManyToOne(() => MenuItem, { nullable: true })
  @JoinColumn({ name: 'buy_item_id' })
  buy_item!: MenuItem | null;

  @Column({ type: 'int', nullable: true })
  buy_category_id!: number | null;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'buy_category_id' })
  buy_category!: Category | null;

  // free item given
  @Column({ type: 'int', nullable: true })
  free_item_id!: number | null;

  @ManyToOne(() => MenuItem, { nullable: true })
  @JoinColumn({ name: 'free_item_id' })
  free_item!: MenuItem | null;

  // minimum quantity to trigger
  @Column({ type: 'int', default: 1 })
  min_quantity!: number;

  // how many free items given
  @Column({ type: 'int', default: 1 })
  free_quantity!: number;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  starts_at!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  ends_at!: Date | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}