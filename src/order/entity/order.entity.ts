import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from 'typeorm';
import {User} from '../../auth/entity/user.entity';

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subTotal: number;

    @Column()
    discount: number;

    @Column()
    delivery: number;

    @Column()
    dateCreated: Date;

    @Column('simple-json')
    cartProduct: JSON;

    @ManyToOne(type => User, user => user.orders, { eager: false })
    user: User;

    @Column()
    userId: number;
}
