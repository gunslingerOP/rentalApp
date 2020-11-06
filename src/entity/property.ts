import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";
import { User } from "./User";


@Entity("property")
export class Property extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    User_id: number;

    @Column()
    district_id: number;

    @Column()
    address:string;

    @Column()
    price: number;


    @Column()
    bedrooms: number;


    @Column()
    bathrooms: number;


    @Column()
    status: boolean;

    @Column()
    size: string;

    @Column()
    longitude:string;

    @Column()
    latitude:string;

    @ManyToOne((type)=>User, (user)=> user.properties)
    user: User;

}