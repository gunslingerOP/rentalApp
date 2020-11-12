import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity("notifications")
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  recipientId: number;

  @Column()
  msg: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created: Date;

  @ManyToOne((type) => User, (user) => user.notifications)
  user: User;
}
