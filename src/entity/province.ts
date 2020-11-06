import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";


@Entity("province")
export class Province extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Name: string;

}