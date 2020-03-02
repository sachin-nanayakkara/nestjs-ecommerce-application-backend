import {IsString, MinLength, MaxLength, Matches, IsEmail, IsNumber} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  phone: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  address: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
