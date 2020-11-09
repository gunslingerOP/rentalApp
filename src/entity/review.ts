import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, OneToOne} from "typeorm";
import { Property } from "./property";
import { ReviewImage } from "./reviewImage";


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

    @OneToMany(type => ReviewImage, (reviewImages) => reviewImages.review)
    images: ReviewImage;

    @ManyToOne(type=> Property, (property)=> property.review)
    property: Property
}
