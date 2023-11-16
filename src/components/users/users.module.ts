import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersDao } from './users.dao';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      User
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersDao]
})
export class UsersModule {}
