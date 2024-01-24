import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { EventLogsModule } from '../event-logs/event-logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Profile
    ]),
    EventLogsModule
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule { }
