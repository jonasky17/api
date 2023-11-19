import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { User } from './entities/user.entity';
import { HttpExceptionFilter } from 'src/shared/exceptions/http-exception.filter';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 204,
    description: 'New user created!'
  })
  // @UseFilters(new HttpExceptionFilter)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto)
    .catch(err => {
      throw new HttpException({
        status:500,
        error:"Something went wrong!",
        data:[{errorno:err.errno,code:err.code}]
      },HttpStatus.BAD_REQUEST)
    });
    
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'A JSON object containing list of users',
    type: User,
    isArray: true
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Search user result',
    type: User
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 204,
    description: 'User updated!',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'User deleted!',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
