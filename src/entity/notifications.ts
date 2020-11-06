import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";


@Entity("notifications")
export class Notification extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    msg: string;

}