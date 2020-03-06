import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn} from 'typeorm';
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
    discount: number;

    @Column()
    description: string;

    @Column()
    productImage: string;

    @Column()
    lastUpdate: Date;

    @OneToMany(type => Rating, rating => rating.products, {eager: true})
    ratings: Rating[];
}
