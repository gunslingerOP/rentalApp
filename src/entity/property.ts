import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany, OneToOne} from "typeorm";
import { PropertyImage } from "./propertyImages";
import { Review } from "./review";
import { User } from "./User";
import {City} from './city'
import { District } from "./district";

@Entity("property")
export class Property extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    districtId: number;

    @Column()
    description:string;

    @Column()
    title:string;

    @Column()
    price: number;

    @Column()
    cityId: number;

    @Column()
    bedrooms: number;

    @Column()
    bathrooms: number;

    @Column()
    booked: boolean;

    @Column()
    size: string;

    @Column()
    longitude:string;

    @Column()
    latitude:string;

    @ManyToOne((type)=>User, (user)=> user.properties)
    user: User;

    @OneToMany((type)=>Review, (review)=>review.property)
    reviews:Review[];

    @OneToMany((type)=>PropertyImage, (propertyImage)=> propertyImage.property)
    images:PropertyImage[]

    @ManyToOne((type)=>City, (city)=>city.properties)
    city:City;

    @ManyToOne((type)=>District, (district)=>district.properties)
    district:District;
}