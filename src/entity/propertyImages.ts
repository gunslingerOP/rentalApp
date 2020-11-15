import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import { Property } from "./property";


@Entity("propertyImages")
export class PropertyImage extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    propertyID: number;

    @Column()
    image: string;

    @ManyToOne(type => Property, property => property.images)
    property: Property;
}

