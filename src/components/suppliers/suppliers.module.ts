import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { EventLogsModule } from '../event-logs/event-logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Supplier
    ]),
    EventLogsModule
  ],
  controllers: [SuppliersController],
  providers: [
    SuppliersService
  ],
})
export class SuppliersModule { }
