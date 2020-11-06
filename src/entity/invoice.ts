import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";


@Entity("invoices")
export class Invoice extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    landLord_id: number;

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

}