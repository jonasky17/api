import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './components/users/users.module';
import { User } from './components/users/entities/user.entity';
import { LogsModule } from './components/logs/logs.module';
import { Log } from './components/logs/entities/log.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'',
      database:'tabs_db',
      entities:[
        User,
        Log
      ],
      synchronize:true,
    }),
    UsersModule,
    LogsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
