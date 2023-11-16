import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from "@nestjs/swagger/dist";
import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty()
    @IsString()
    @IsOptional()
    passwortd:string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    role:string

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isActive:boolean

}
