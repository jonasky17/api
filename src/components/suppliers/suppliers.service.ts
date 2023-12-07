import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';
import { EventLogsService } from '../event-logs/event-logs.service';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly repoSupplier: Repository<Supplier>,

    private readonly eventLogsService:EventLogsService
  ){}
  async create(createSupplierDto: CreateSupplierDto) {
    const newSupplier = await this.repoSupplier.save(createSupplierDto);
    if(newSupplier){
      const logs = {
        action:"created",
        description:`new supplier ${newSupplier.name}`,
        user_id:0
      }
      const newLog = await this.eventLogsService.create(logs)
      return {
        status:200,
      error:"",
      data:[{message:`New supplier '${newSupplier.name}' created!`}]
      }
    }
  }

  async findAll() {
    const getAll = await this.repoSupplier.find();
    if(getAll){
      return {
        status:200,
        error:"",
        data:getAll
      }
    }
    
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

 async remove(id: number) {
    const result = await this.repoSupplier
    .createQueryBuilder()
    .softDelete()
    .where("id = :id", { id: id })
    .execute();
    const logs = {
      action:"deleted",
      description:`deleted supplier ${id}`,
      user_id:0
    }
    if(result){
      const newLog = await this.eventLogsService.create(logs)
      return {
        status:200,
        error:"",
        data:[{message:"Supplier deleted!"}]
      };
    }
  }

  async restore(id: number) {
    const result = await this.repoSupplier
    .createQueryBuilder()
    .restore()
    .where("id = :id", { id: id })
    .execute();
    const logs = {
      action:"restored",
      description:`restored supplier ${id}`,
      user_id:0
    }
    if(result){
      const newLog = await this.eventLogsService.create(logs)
      return {
        status:200,
        error:"",
        data:[{message:"Supplier restored!"}]
      };
    }
  }

  async search(key:string){
    const result = await this.repoSupplier
    .createQueryBuilder()
    .where("tin like :key OR name like :key",{key:`%${key}%`})
    .getMany();
    return result;
  }
}
