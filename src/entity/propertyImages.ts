import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import { Property } from "./property";


@Entity("propertyImages")
export class PropertyImage extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    propertyID: string;

    @Column()
    Image: string;

    @ManyToOne(type => Property, property => property.images)
    property: Property;
}

