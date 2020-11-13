import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Invoice } from "./invoice";
import { Notification } from "./notifications";
import { Property } from "./property";
import { PropertyImage } from "./propertyImages";
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

  @Column({ nullable: true })
  resetotp: number;

  @Column()
  verified: boolean;

  @Column({ nullable: true })
  image: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  OTP: number;

  @Column({ unique: true })
  phone: string;

  @Column()
  isOwner: boolean;

  @Column()
  cityId: number;

  @Column()
  districtId: number;

  @OneToMany((type) => Property, (property) => property.user)
  properties: Property[];

  @OneToMany((type) => Property, (notification) => notification.user)
  notifications: Notification[]; // FIXME: add s

  @OneToMany((type) => Property, (invoice) => invoice.user)
  invoices: Invoice[]; // FIXME: add s
}
