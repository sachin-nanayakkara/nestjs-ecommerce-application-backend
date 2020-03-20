import {Injectable, UnauthorizedException, Logger} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repository/user.repository';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { JwtPayload } from '../interface/jwt-payload.interface';
import {AuthUserLoginDto} from '../dto/auth-user-login.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthUserLoginDto): Promise<{ token: string, user: string, id: number  }> {
    const { username } = authCredentialsDto;
    const found = await this.userRepository.findOne({ username });
    let token;
    {
          // tslint:disable-next-line:no-shadowed-variable
          const username = await this.userRepository.validateUserPassword(authCredentialsDto);

          if (!username) {
              throw new UnauthorizedException('Invalid credentials');
          }

          const payload: JwtPayload = {username};
          token = await this.jwtService.sign(payload);
          this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);
      }

    const user = found.username;
    const id  =  found.id;

    return {token, user, id};
  }
}
