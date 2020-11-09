import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Property } from "./property";


@Entity("districts")
export class District extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    cityID: number;

    @OneToMany((type)=>Property, (property)=>property.district)
    property:Property;
}