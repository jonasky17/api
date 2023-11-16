import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';

@Injectable()
export class LogDao{
    constructor(
        @InjectRepository(Log)
        private readonly repoLog: Repository<Log>
    ){}

     /**START CREATE LOG*/
     async createLog(){
        return "test";
    }
    /**END CREATE LOG*/
}