import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dtos/registerUserDto';
import { LoginUserDto } from './dtos/loginUserDto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('login')
  async login(
    @Body() user: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwtCookie = await this.userService.login(user);
    response.cookie('jwt', jwtCookie, { httpOnly: true });
    return { token: jwtCookie };
  }

  @Post('register')
  async register(@Body() user: RegisterUserDto, @Res() response: Response) {
    const registeredUserResult = this.userService.register(user);
    return response.status(200).json({ message: 'success' });
  }

  @Get()
  async findAll(@Res() response: Response) {
    const allUsers = await this.userService.findAll();
    return response.status(200).json(allUsers);
  }
}
