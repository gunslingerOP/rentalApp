import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import { User } from "./User";


@Entity("invoices")
export class Invoice extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    landlord_id: number;

    @Column()
    Host_paid_status: boolean;

    @Column({ nullable: true })
    zcTransactionId: string;
  
    @Column({ nullable: true })
    zcMsisdn: string;
  
    @Column({ nullable: true })
    zcOperation: string;
  
    @Column({ nullable: true })
    zcMsg: string;

    @Column()
    user_id:number;

    @Column()
    price:string;

    @Column()
    property_id:number;

    @Column()
    has_reviewed:boolean;

    @Column()
    paid_status:boolean;

    @Column()
    user_refund_status:boolean;

    @ManyToOne(type => User, user => user.invoice)
    user: User;
}
