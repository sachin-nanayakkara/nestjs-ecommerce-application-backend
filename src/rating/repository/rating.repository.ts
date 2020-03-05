import {EntityRepository, Repository} from 'typeorm';
import {Rating} from '../entity/rating.entity';
import {InternalServerErrorException, Logger} from '@nestjs/common';
import {GetRatingsFilterDto} from '../dto/get-rating.dto';
import {Product} from '../../product/entity/product.entity';
import {CreateRatingDto} from '../dto/create-rating.dto';

@EntityRepository(Rating)
export class RatingRepository extends Repository<Rating> {
    private logger = new Logger('OrderRepository');

    async getRatings(
        filterDto: GetRatingsFilterDto,
        product: Product,
    ): Promise<Rating[]> {
        const {search} = filterDto;
        const query = this.createQueryBuilder('rating');

        query.where('rating.productId = :productId', {productId: product.id});

        if (search) {
            query.andWhere('(rating.userId LIKE :search)', {search: `%${search}%`});
        }

        try {
            const ratings = await query.getMany();
            return ratings;
        } catch (error) {
            this.logger.error(`Failed to get ratings for products "${product.name}". Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async createRating(
        createProductDto: CreateRatingDto,
        product: Product,
    ): Promise<Rating> {
        const { rating, userId } = createProductDto;

        const ratings = new Rating();
        ratings.rating = rating;
        ratings.userId = userId;
        ratings.products = product;

        try {
            await ratings.save();
        } catch (error) {
            this.logger.error(`Failed to create a rating for products `);
            throw new InternalServerErrorException();
        }

        delete ratings.products;
        return ratings;
    }
}
