import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { City } from "./city";
import { Property } from "./property";

@Entity("districts")
export class District extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({default:false})
  active: boolean;

  // @Column()
  // cityID: number;

  @OneToMany((type) => Property, (property) => property.district)
  properties: Property[];

  @ManyToOne((type) => City, (city) => city.districts)
  city: City;
}
