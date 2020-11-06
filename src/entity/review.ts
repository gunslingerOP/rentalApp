import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";


@Entity("reviews")
export class Review extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    property_id: number;

    @Column()
    stars:number;

    @Column()
    title:string;

    @Column()
    body:string;

    @Column()
    tenant_id:number;

    @Column()
    invoice_status:string;
}