import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
    constructor(
        private readonly configService: ConfigService
    ) { }

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "mysql",
            host: this.configService.get('DATABASE_HOST'),
            port: this.configService.get('DATABASE_PORT'),
            username: this.configService.get('DATABASE_USER'),
            password: this.configService.get('DATABASE_PASSWORD'),
            database: this.configService.get('DATABASE_NAME'),
            entities: ['dist/**/*.entity.{ts,js}'],
            autoLoadEntities: true,
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            synchronize: true
        };
    }
}
