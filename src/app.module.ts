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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
