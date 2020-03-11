import {IsString, MaxLength, MinLength} from 'class-validator';

export class AuthUserLoginDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;
}
