import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";


@Entity("reviewImages")
export class ReviewImage extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    propertyID: string;

    @Column()
    Image: string;

}