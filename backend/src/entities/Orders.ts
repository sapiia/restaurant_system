import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn
} from "typeorm";
import { OrderItem } from "./OrderItem.js";

export enum OrderStatus {
  PENDING = "PENDING",
  COOKING = "COOKING",
  READY = "READY",
  SERVED = "SERVED",
  COMPLETED = "COMPLETED"
}

export enum PaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID"
}

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({type: "int"})
  tableNumber!: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  orderStatus!: OrderStatus;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.UNPAID
  })
  paymentStatus!: PaymentStatus;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  totalPrice!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true
  })
  items!: OrderItem[];
}