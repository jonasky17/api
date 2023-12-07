import { Module } from '@nestjs/common';
import { EventLogsService } from './event-logs.service';
import { EventLogsController } from './event-logs.controller';
import { EventLog } from './entities/event-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      EventLog
    ])
  ],
  controllers: [EventLogsController],
  providers: [EventLogsService],
})
export class EventLogsModule {}
