import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";
import {Property} from './property'
@Entity("users")
export class User extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: string;
    
    @Column()
    middleName: string;
    
    @Column()
    lastName: string;

    @Column()
    verified: boolean;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ unique: true })
    phone: string;

    @Column()
    isOwner: boolean;

    @Column({nullable:true})
    cityID: number;

    @Column({nullable:true})
    districtID: number;

    @OneToMany((type)=>Property, (property)=> property.user)
    properties:Property[];
}
