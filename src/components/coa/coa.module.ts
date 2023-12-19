import { Module } from '@nestjs/common';
import { CoaService } from './coa.service';
import { CoaController } from './coa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coa } from './entities/coa.entity';
import { EventLogsModule } from '../event-logs/event-logs.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Coa
    ]),
    EventLogsModule
  ],
  controllers: [CoaController],
  providers: [CoaService],
})
export class CoaModule {}
