import { Injectable } from '@nestjs/common';
import { CreateCoaDto } from './dto/create-coa.dto';
import { UpdateCoaDto } from './dto/update-coa.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Coa } from './entities/coa.entity';
import { EventLogsService } from '../event-logs/event-logs.service';


@Injectable()
export class CoaService {
  constructor(
    @InjectRepository(Coa)
    private readonly repoCoa:Repository<Coa>,
    private readonly evenLogsService:EventLogsService
  ){}

  async create(createCoaDto: CreateCoaDto) {
    try{
      const newCoa = await this.repoCoa.save(createCoaDto);
      if(newCoa){
        const logs = {
          action: "created",
          description: `new COA ${newCoa.account_name}`,
          user_id:0
        }
        const newLog = await this.evenLogsService.create(logs);
        return{
          status:200,
          error:'',
          data:[{message:`New COA ${newCoa.account_name} created!`}]
        }
      }
    }catch(err){
      throw err;
    }
    return 'This action adds a new coa';
  }

  findAll() {
    return `This action returns all coa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coa`;
  }

  update(id: number, updateCoaDto: UpdateCoaDto) {
    return `This action updates a #${id} coa`;
  }

  remove(id: number) {
    return `This action removes a #${id} coa`;
  }
}
