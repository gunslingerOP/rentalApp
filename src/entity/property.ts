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
    address:string;

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
    review:Review;

    @OneToMany((type)=>PropertyImage, (propertyImage)=> propertyImage.property)
    images:PropertyImage[]

    @ManyToOne((type)=>City, (city)=>city.property)
    city:City;

    @ManyToOne((type)=>District, (district)=>district.property)
    district:District;
}