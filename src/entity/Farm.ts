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
export class Farm {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name : string;

    @Column("text")
    address : string;

    @Column("text")
    description : string;

    @ManyToOne(type => Customer,customer => customer.farm, { onDelete: 'CASCADE' })
    customer:Customer

    @Column()
    status : boolean;

}