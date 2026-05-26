import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";

import { Order } from "./Order";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  menuItemId!: number;

  @Column()
  quantity!: number;

  @Column("decimal")
  price!: number;

  @ManyToOne(
    () => Order,
    order => order.items,
    {
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  )
  order!: Order;
}