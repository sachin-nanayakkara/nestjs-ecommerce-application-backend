import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import {User} from '../../auth/entity/user.entity';

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: string;

    @Column()
    dateCreated: string;

    @ManyToOne(type => User, user => user.orders, { eager: false })
    user: User;

    @Column()
    userId: number;
}
