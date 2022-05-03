import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/modules/userModule/services/user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createActivity(@Res() response, @Body() userDto: User) {
    const newUser = await this.userService.create(userDto);
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const user = await this.userService.readById(id);
    return response.status(HttpStatus.OK).json({
      user,
    });
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() user: User) {
    const updatedUser = await this.userService.update(id, user);
    return response.status(HttpStatus.OK).json({
      updatedUser,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedUser = await this.userService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedUser,
    });
  }
}
