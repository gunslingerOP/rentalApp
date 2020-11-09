import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Property } from "./property";


@Entity("city")
export class City extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    provinceID: number;

    @OneToMany((type)=>Property, (property)=>property.city)
    property:Property;

}