import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import { User } from "./User";


@Entity("invoices")
export class Invoice extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    landlordId: number;

    @Column()
    hostPaidStatus: boolean;

    @Column({ nullable: true })
    zcTransactionId: string;
  
    @Column({ nullable: true })
    zcMsisdn: string;
  
    @Column({ nullable: true })
    zcOperation: string;
  
    @Column({ nullable: true })
    zcMsg: string;

    @Column()
    userId:number;

    @Column()
    endDay:number;

    @Column()
    endMonth:number;

    @Column()
    startHour:number;

    @Column()
    startDay:number;

    @Column()
    startMonth:number;

    @Column()
    price:string;

    @Column()
    propertyId:number;

    @Column()
    hasReviewed:boolean;

    @Column()
    paidStatus:boolean;

    @Column()
    userRefundStatus:boolean;

    @ManyToOne(type => User, user => user.invoice)
    user: User;
}
