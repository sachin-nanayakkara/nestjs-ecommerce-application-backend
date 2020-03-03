import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import {Product} from '../../product/entity/product.entity';

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Product, product => product.category, { eager: true })
    products: Product[];
}
