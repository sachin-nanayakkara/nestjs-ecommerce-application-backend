import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from 'typeorm';
import {User} from '../../auth/entity/user.entity';

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subTotal: bigint;

    @Column()
    discount: bigint;

    @Column()
    delivery: bigint;

    @Column()
    dateCreated: Date;

    @Column()
    cartProduct: JSON;

    @ManyToOne(type => User, user => user.orders, { eager: false })
    user: User;

    @Column()
    userId: number;
}
