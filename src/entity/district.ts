import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";


@Entity("districts")
export class Images extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    cityID: number;

}