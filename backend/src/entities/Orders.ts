import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from "typeorm";

export enum OrderStatus {
  PENDING = "PENDING",
  COOKING = "COOKING",
  READY = "READY",
  SERVED = "SERVED",
  COMPLETED = "COMPLETED",
}

export enum PaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
}

@Entity("orders")
export class Orders {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "int" })
  tableNumber!: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  orderStatus!: OrderStatus;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.UNPAID,
  })
  paymentStatus!: PaymentStatus;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  totalPrice!: number;

  @CreateDateColumn()
  createdAt!: Date;

  // IMPORTANT: lazy import to avoid circular crash in ESM
  @OneToMany(
    // cast to any to satisfy TypeScript typing for lazy ESM import
    ((() => (import("./OrderItem.js").then(m => m.OrderItem) as unknown) as any)),
    (item: any) => item.order,
    {
      cascade: true,
    }
  )
  items!: any[];
}