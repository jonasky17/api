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

    private readonly eventLogsService: EventLogsService
  ) { }
  async create(createSupplierDto: CreateSupplierDto) {
    const newSupplier = await this.repoSupplier.save(createSupplierDto);
    if (newSupplier) {
      const logs = {
        action: "created",
        description: `new supplier ${newSupplier.name}`,
        user_id: 0
      }
      const newLog = await this.eventLogsService.create(logs)
      return {
        status: 200,
        error: "",
        data: [{ message: `New supplier '${newSupplier.name}' created!`, id:newSupplier.id }]
      }
    }
  }

  async findAll() {
    const getAll = await this.repoSupplier.find();
    if (getAll) {
      return {
        status: 200,
        error: "",
        data: getAll
      }
    }

  }

  async findOne(id: number) {
    try {
      const result = await this.repoSupplier
        .createQueryBuilder()
        .where("id = :id", { id: id })
        .getOne();
      console.log(result);
      if (result) {
        return {
          status: 200,
          error: "",
          data: result
        };
      } else {
        return {
          status: 404,
          error: "",
          data: [{ message: "No result found!" }]
        };
      }
    } catch (err) {
      console.log(err)
      return {
        status: err.errno,
        error: err.code,
        data: [{ message: "Something went wrong" }]
      };
    }

  }

  async update(id: number, data: UpdateSupplierDto) {
    // const formData = {
    //   tin:updateSupplierDto.tin,
    //   name:updateSupplierDto.name,
    //   address:updateSupplierDto.address
    // }
    const result = await this.repoSupplier.update(id, data);
    console.log(result);
    const logs = {
      action: "update",
      description: `updated supplier ${id}`,
      user_id: 0
    }
    if (result) {
      const newLog = await this.eventLogsService.create(logs);
      return {
        status: 200,
        error: "",
        data: [{ message: "Supplier updated!" }]
      }
    }
  }

  async remove(id: number) {
    const result = await this.repoSupplier
      .createQueryBuilder()
      .softDelete()
      .where("id = :id", { id: id })
      .execute();
    const logs = {
      action: "deleted",
      description: `deleted supplier ${id}`,
      user_id: 0
    }
    if (result) {
      const newLog = await this.eventLogsService.create(logs)
      return {
        status: 200,
        error: "",
        data: [{ message: "Supplier deleted!" }]
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
      action: "restored",
      description: `restored supplier ${id}`,
      user_id: 0
    }
    if (result) {
      const newLog = await this.eventLogsService.create(logs)
      return {
        status: 200,
        error: "",
        data: [{ message: "Supplier restored!" }]
      };
    }
  }

  async search(key: string) {
    const result = await this.repoSupplier
      .createQueryBuilder()
      .where("tin like :key OR name like :key", { key: `%${key}%` })
      .getMany();
    return result;
  }

  async upload(data: CreateSupplierDto[]) {
    // console.log(data);
    const result = await this.repoSupplier.save(data);
    const logs = {
      action: "import",
      description: `imported ${data.length} suppliers`,
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
