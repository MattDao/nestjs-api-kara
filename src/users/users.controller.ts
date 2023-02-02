import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

import { RoleEnumType, User } from './entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guards';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // --- Requètes users --- //

  /*@Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }*/
 // --- Requètes en fonction du rôle --- //
  @Get()
  @UseGuards(RolesGuard)
  @Roles(RoleEnumType.MJ)
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsersByMj()
  }
    @Get()
    @UseGuards(RolesGuard)
    @Roles(RoleEnumType.MJ)
    findUser(
      @Param('id') id: string,
       @GetUser() user: User): Promise<User> {
      return this.usersService.findOneUserByMj(id, user);
    }
  
    @Patch(':id')
    updateUser(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
      @GetUser() user: User,
    ) {
      console.log(user);
      return this.usersService.updateUser(id, updateUserDto, user);
    }
  
    @Delete(':id')
    remove(
      @Param('id') id: string, 
      @GetUser() user: User
      ) {
      return this.usersService.remove(id, user);
    }
}
