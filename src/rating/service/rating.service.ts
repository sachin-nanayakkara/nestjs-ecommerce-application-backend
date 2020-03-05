import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {GetRatingsFilterDto} from '../dto/get-rating.dto';
import {Product} from '../../product/entity/product.entity';
import {Rating} from '../entity/rating.entity';
import {RatingRepository} from '../repository/rating.repository';
import {CreateRatingDto} from '../dto/create-rating.dto';

@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(RatingRepository)
        private ratingRepository: RatingRepository,
    ) {
    }

    async getRatings(
        filterDto: GetRatingsFilterDto,
        product: Product,
    ): Promise<Rating[]> {
        return this.ratingRepository.getRatings(filterDto, product);
    }

    async getRatingById(
        id: number,
        product: Product,
    ): Promise<Rating> {
        const found = await this.ratingRepository.findOne({where: {id, productId: product.id}});

        if (!found) {
            throw new NotFoundException(`Order with ID "${id}" not found`);
        }

        return found;
    }

    async createRating(
        createRatingDto: CreateRatingDto,
        product: Product,
    ): Promise<Rating> {
        return this.ratingRepository.createRating(createRatingDto, product);
    }

    async updateRating(
        id: number,
        createRatingDto: CreateRatingDto,
        product: Product,
    ): Promise<Rating> {
        const {rating, userId} = createRatingDto;

        const ratings = await this.getRatingById(id, product);
        ratings.rating = rating;
        ratings.userId = userId;
        await ratings.save();
        return ratings;
    }
}
