import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import { User } from "./User";


@Entity("notifications")
export class Notification extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    recipient_id: number;

    @Column()
    msg: string;

    @ManyToOne(type => User, user => user.notification)
    user: User;
}
