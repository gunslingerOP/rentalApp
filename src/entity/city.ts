import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";


@Entity("city")
export class Images extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    provinceID: number;

}