import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email!: string;

  @Column({ type: 'varchar', nullable: false })
  password!: string;

  @Column({ type: 'enum', enum: ['ADMIN', 'CHEF', 'CASHIER', 'CUSTOMER'], default: 'CUSTOMER' })
  role!: 'ADMIN' | 'CHEF' | 'CASHIER' | 'CUSTOMER';

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}
