import {BadRequestException, Body, Controller, Get, Logger, Post, Req, Res, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../../services/users/users.service';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../dtos/CreateUser.dto';

@Controller('api/users')
export class UsersController {

    private readonly logger = new Logger(UsersController.name)


    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
        const user = await this.usersService.create({
            email: createUserDto.email,
            nom: createUserDto.nom,
            prenom: createUserDto.prenom,
            tel: createUserDto.tel,
            active: true,
            password: hashedPassword
        });
        delete user.password;
        return user;
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response,
      ) {
        try {
          this.logger.log("Connexion de l'utilisateur", { email });
          
          const user = await this.usersService.findOne(email);
      
          if (!user) {
            this.logger.error("Identifiants invalides", { email });
            throw new BadRequestException('Identifiants invalides');
          }
      
          const passwordMatch = await bcrypt.compare(password, user.password);
      
          if (!passwordMatch) {
            this.logger.error("Identifiants invalides", { email });
            throw new BadRequestException('Identifiants invalides');
          }
      
          const jwt = await this.jwtService.signAsync({ id: user.id });
      
          response.cookie('jwt', jwt, { httpOnly: true });
      
          response.status(200).json({
            idToken: jwt,
            expiresIn: 3600,
          });
        } catch (error) {
          this.logger.error("Erreur lors de la connexion de l'utilisateur", { email, error });
          throw error;
        }
      }

    @Get('user')
    async user(@Req() request: Request) {
        try {
            const jwt = request.headers.authorization.replace('Bearer ', '');
            const data = await this.jwtService.verifyAsync(jwt);

            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.usersService.findOneById({id: data['id']});
            const {password, ...result} = user;

            return result;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'success'
        }
    }
}
