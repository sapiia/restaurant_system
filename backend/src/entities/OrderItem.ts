import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Orders } from "./Orders.js";
import { MenuItem } from "./MenuItem.js";

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @ManyToOne(
    () => Orders,
    (order) => order.items,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "order_id" })
  order!: Orders;

  @ManyToOne(() => MenuItem, {
    onDelete: "CASCADE",
  })
  menuItem!: MenuItem;

  @Column({ type: "int" })
  quantity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;
}