import { Controller, Get, Request } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Roles(Role.Admin)
  @Get()
  async findAll(@Request() req) {
    console.log(req.user);
    return await this.userService.findAll();
  }
}
