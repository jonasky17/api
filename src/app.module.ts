import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './components/users/users.module';
import { User } from './components/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigService } from './shared/typeorm-config/typeorm-config.service';
import { EventLogsModule } from './components/event-logs/event-logs.module';
import { SuppliersModule } from './components/suppliers/suppliers.module';
import { ProfilesModule } from './components/profiles/profiles.module';
import { CoaModule } from './components/coa/coa.module';
import { ExpensesModule } from './components/expenses/expenses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
     useClass:TypeormConfigService
    }),
    UsersModule,
    EventLogsModule,
    SuppliersModule,
    ProfilesModule,
    CoaModule,
    ExpensesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
