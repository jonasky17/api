import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersDao{
    constructor(
        @InjectRepository(User)
        private readonly repoUser: Repository<User>
    ){}

    /**START CREATE USER*/
    async createUser(){
        return "test";
    }
    /**END CREATE USER*/
}