import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import { Review } from "./review";


@Entity("reviewImages")
export class ReviewImage extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    reviewId: string;

    @Column()
    Image: string;

    @ManyToOne(type => Review, (review) => review.images)
    review: Review;
}

