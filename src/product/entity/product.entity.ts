import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany} from 'typeorm';
import {Order} from '../../order/entity/order.entity';
import {Rating} from '../../rating/entity/rating.entity';

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @OneToMany(type => Rating, rating => rating.products, { eager: true })
    ratings: Rating[];

    @ManyToMany(type => Order, product => product.products)
    @JoinTable()
    orders: Order[];
}
