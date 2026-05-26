import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn
} from "typeorm";
import { OrderItem } from "./OrderItem";

export enum OrderStatus {
  PENDING = "PENDING",
  COOKING = "COOKING",
  READY = "READY",
  SERVED = "SERVED",
  COMPLETED = "COMPLETED"
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tableNumber!: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  status!: OrderStatus;

  @Column("decimal", { precision: 10, scale: 2 })
  totalPrice!: number;

  @CreateDateColumn()
  createdAt!: Date;

  // ✅ One-to-Many relation with OrderItem
  @OneToMany(
    () => OrderItem,
    (item) => item.order,
    {
      cascade: true
    }
  )
  items!: OrderItem[];
}