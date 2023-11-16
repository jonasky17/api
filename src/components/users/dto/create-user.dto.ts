import { ApiProperty } from "@nestjs/swagger/dist";
import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";



export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password:string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    role:string
}
