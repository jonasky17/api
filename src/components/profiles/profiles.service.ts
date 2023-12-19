import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { EventLogsService } from '../event-logs/event-logs.service';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly repoProfile: Repository<Profile>,

    private readonly eventLogsService: EventLogsService
  ) { }

  async create(createProfileDto: CreateProfileDto) {
    try {
      
      const newProfile = await this.repoProfile.save(createProfileDto);
      if (newProfile) {
        const logs = {
          action: "created",
          description: `new profile ${newProfile.name}`,
          user_id: 0
        }
        const newLog = await this.eventLogsService.create(logs);
        return {
          status: 200,
          error: '',
          data: [{ message: `Profile ${createProfileDto.name} created!` }]
        }
      }

    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try{
      const result = await this.repoProfile.find();
      return{
        status:200,
        error:"",
        data:result
      }
    }catch(err){
       throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
