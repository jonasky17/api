import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { EventLogsModule } from '../event-logs/event-logs.module';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Coa } from '../coa/entities/coa.entity';
import { Profile } from '../profiles/entities/profile.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Expense,
      Supplier,
      Coa,
      Profile
    ]),
    EventLogsModule
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
