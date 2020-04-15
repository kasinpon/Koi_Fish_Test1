import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany,ManyToOne
} from "typeorm";
import {Customer} from "./Customer";

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Customer,customer => customer.account, { onDelete: 'CASCADE' })
    customer:Customer

    @Column()
    status : boolean;

}