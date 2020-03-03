import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {Category} from '../../category/entity/category.entity';

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    description: string;

    @ManyToOne(type => Category, category => category.products, { eager: false })
    category: Category;

    @Column()
    categoryId: number;
}
