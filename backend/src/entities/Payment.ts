import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { Orders } from './Orders.js';

export enum PaymentMethod {
  CASH     = 'CASH',
  CARD     = 'CARD',
  QR_CODE  = 'QR_CODE',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'int', unique: true })
  order_id!: number;

  @OneToOne(() => Orders)
  @JoinColumn({ name: 'order_id' })
  order!: Orders;

  @Column({ type: 'enum', enum: PaymentMethod })
  payment_method!: PaymentMethod;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @CreateDateColumn()
  paid_at!: Date;
}