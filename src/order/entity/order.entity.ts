import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany} from 'typeorm';
import {User} from '../../auth/entity/user.entity';
import {Product} from '../../product/entity/product.entity';

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: string;

    @Column()
    dateCreated: string;

    @ManyToMany(type => Product, question => question.orders)
    products: Product[];

    @ManyToOne(type => User, user => user.orders, { eager: false })
    user: User;

    @Column()
    userId: number;
}
