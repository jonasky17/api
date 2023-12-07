import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventLogDto } from './dto/create-event-log.dto';
import { UpdateEventLogDto } from './dto/update-event-log.dto';
import { EventLog } from './entities/event-log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventLogsService {
  constructor(
    @InjectRepository(EventLog)
    private readonly repoLog: Repository<EventLog>
  ){}
  async create(createEventLogDto: CreateEventLogDto) {
    return await this.repoLog.save(createEventLogDto);
  }

  findAll() {
    return `This action returns all eventLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventLog`;
  }

  update(id: number, updateEventLogDto: UpdateEventLogDto) {
    return `This action updates a #${id} eventLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventLog`;
  }
}
