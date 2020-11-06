import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";


@Entity("propertyImages")
export class PropertyImage extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    propertyID: string;

    @Column()
    Image: string;

}