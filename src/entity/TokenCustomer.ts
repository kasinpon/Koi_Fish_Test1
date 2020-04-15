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
export class TokenCustomer {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Customer,customer => customer.tokencustomer, { onDelete: 'CASCADE' })
    customer:Customer

    @Column("text")
    Authorization:String;

    @Column()
    exprire:Date
}