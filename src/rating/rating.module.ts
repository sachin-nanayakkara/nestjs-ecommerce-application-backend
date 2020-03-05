import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from '../auth/auth.module';
import {RatingRepository} from './repository/rating.repository';
import {RatingController} from './controller/rating.controller';
import {RatingService} from './service/rating.service';
import {Module} from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([RatingRepository]),
        AuthModule,
    ],
    controllers: [RatingController],
    providers: [RatingService],
})
export class OrdersModule {}
