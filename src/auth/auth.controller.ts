import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDTO } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { Public } from './decorators/public.auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    response.statusMessage = 'Logged in successfully';
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const checkExistingEmail = await this.userService.findOne(
      createUserDto.email,
    );
    if (checkExistingEmail) {
      throw new ConflictException('User already exist');
    }

    try {
      response.statusMessage = 'User created successfully';
      return await this.authService.register(createUserDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
