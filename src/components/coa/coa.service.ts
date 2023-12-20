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
    private readonly repoCoa: Repository<Coa>,
    private readonly eventLogsService: EventLogsService
  ) { }

  async create(createCoaDto: CreateCoaDto) {
    try {
      const newCoa = await this.repoCoa.save(createCoaDto);
      if (newCoa) {
        const logs = {
          action: "created",
          description: `new COA ${newCoa.account_name}`,
          user_id: 0
        }
        const newLog = await this.eventLogsService.create(logs);
        return {
          status: 200,
          error: '',
          data: [{ message: `New COA ${newCoa.account_name} created!` }]
        }
      }
    } catch (err) {
      throw err;
    }
    return 'This action adds a new coa';
  }

  async findAll() {
    try {
      const result = await this.repoCoa.find();
      console.log(result);
      return {
        status: 200,
        error: "",
        data: result
      }
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.repoCoa
        .createQueryBuilder()
        .where("id = :id", { id: id })
        .getOne();
      if (result) {
        return {
          status: 200,
          error: "",
          data: result
        };
      } else {
        return {
          status: 404,
          error: "NOTFOUND",
          data: [{ message: "No result found!" }]
        };
      }
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateCoaDto: UpdateCoaDto) {
    try {
      const result = await this.repoCoa.update(id, updateCoaDto);
      const logs = {
        action: "update",
        description: `updated COA ${id}`,
        user_id: 0
      }
      if (result) {
        const newLog = await this.eventLogsService.create(logs);
        return {
          status: 200,
          error: "",
          data: [{ message: "COA record updated!" }]
        }
      }

    } catch (err) {
      throw err;
    }
  }

  async remove(id: number) {
    try {
      const result = await this.repoCoa
        .createQueryBuilder()
        .softDelete()
        .where("id = :id", { id: id })
        .execute()
      const logs = {
        action: "deleted",
        description: `deleted COA record ${id}`,
        user_id: 0
      }
      if (result) {
        const newLog = await this.eventLogsService.create(logs);
        return {
          status: 200,
          error: "",
          data: [{ message: "COA record deleted!" }]
        };
      }
    } catch (err) {
      throw err;
    }
  }

  async search(key: string) {
    const result = await this.repoCoa
      .createQueryBuilder()
      .where("account_name like :key OR account_code like :key", { key: `%${key}%` })
      .getMany();
    return result;
  }

  async restore(id: number) {
    try{
      const result = await this.repoCoa
        .createQueryBuilder()
        .restore()
        .where("id = :id", { id: id })
        .execute();
      const logs = {
        action: "restored",
        description: `COA record ${id} restored`,
        user_id: 0
      }
      if (result) {
        const newLog = await this.eventLogsService.create(logs)
        return {
          status: 200,
          error: "",
          data: [{ message: "COA record restored!" }]
        };
      }
    }catch(err){
      throw err;
    }
  }

  async upload(data: CreateCoaDto[]) {
    // console.log(data);
    const result = await this.repoCoa.save(data);
    const logs = {
      action: "import",
      description: `imported ${data.length} COA`,
      user_id: 0
    }
    if (result) {
      const newLog = await this.eventLogsService.create(logs)
      return {
        status: 200,
        error: "",
        data: [{ message: "Import success!" }]
      }
    }
  }


}
