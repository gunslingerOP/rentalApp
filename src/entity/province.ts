import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { City } from "./city";


@Entity("province")
export class Province extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default:false})
    active:boolean
    
    @OneToMany((type)=>City, (city)=>city.province)
    cities: City[]
}