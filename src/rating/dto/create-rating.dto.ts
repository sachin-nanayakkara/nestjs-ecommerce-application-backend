import {IsNotEmpty} from 'class-validator';

export class CreateRatingDto {
    @IsNotEmpty()
    rating: number;

    @IsNotEmpty()
    userId: number;
}

