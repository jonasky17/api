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
    async createUser(data:any){
        return await this.repoUser.save(data);
        // try{
        //     let newCustomer = await this.repoUser.save(data);
        //     return newCustomer;
        // }catch(error){
        //     if(error.code === "ER_DUP_ENTRY"){
        //         // return {
        //         //     status: "409",
        //         //     error: "Duplicate Entry",
        //         //     data: [{ message: error.sqlMessage}]
        //         //   };
        //         // throw error
        //         return error;
        //     }else{
        //         throw error;
        //     }
           
        // }
        
        
    }
    /**END CREATE USER*/
}