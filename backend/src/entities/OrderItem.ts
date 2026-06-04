import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import type { Orders } from "./Orders.js";
import { MenuItem } from "./MenuItem.js";

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  // IMPORTANT: lazy import to avoid circular crash in ESM
  @ManyToOne(
    // cast to any to satisfy TypeScript typing for lazy ESM import
    (() => (import("./Orders.js").then(m => m.Orders) as unknown) as any),
    (order: any) => order.items,
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