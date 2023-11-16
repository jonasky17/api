import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersDao } from './users.dao';
import * as bcrypt from 'bcrypt';




@Injectable()
export class UsersService {
  constructor(
    private readonly usersDao: UsersDao
  ) { }
  async create(createUserDto: CreateUserDto) {
    let role = "user";
    if (createUserDto.role !== undefined) {
      role = createUserDto.role;
    }
    console.log("role", role);

    const saltOrRounds = 10;
    const password = String(createUserDto.password);
    const hash = await bcrypt.hash(password, saltOrRounds);
    const salt = await bcrypt.genSalt();
    const isMatch = await bcrypt.compare(password, hash);

    const data = {
      username: createUserDto.username,
      password: hash,
      role: role
    }
    console.log("data", data);
    return this.usersDao.createUser(data);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
