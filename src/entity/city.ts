import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { District } from "./district";
import { Property } from "./property";
import { Province } from "./province";

@Entity("city")
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({default:false})
  active: boolean;

  @Column()
  provinceID: number;

  @OneToMany((type) => Property, (property) => property.city)
  property: Property;

  @OneToMany((type) => District, (district) => district.city)
  districts: District[];

  @ManyToOne((type) => Province, (province) => province.cities)
  province: Province;
}
