import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    Index
} from "typeorm";
import {TokenCustomer} from "./TokenCustomer";
import {Account} from "./Account";
import {Farm} from "./Farm";
@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string

    @Column()
    surname:string

    @Column()
    tel: string;

    @Index({ unique: true })
    @Column()
    email:string

    @Index({ unique: true })
    @Column()
    username:string

    @Column()
    password:string

    @Column("text")
    address:string

    @OneToMany(type => TokenCustomer,tokencustomer => tokencustomer.customer, { onDelete: 'CASCADE' })
    tokencustomer:TokenCustomer[]

    @OneToMany(type => Account,account => account.customer, { onDelete: 'CASCADE' })
    account:Account[]

    @OneToMany(type => Farm,farm => farm.customer, { onDelete: 'CASCADE' })
    farm:Farm[]


}