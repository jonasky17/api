import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsDate, } from "class-validator";
import { TransformDate } from "src/transformers/transformDate";
import { Transform } from "class-transformer";

export class CreateProfileDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tin: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    address: string;

    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    contact: string;

    @ApiProperty()
    @Transform(TransformDate)
    @IsDate()
    @IsOptional()
    date_registered: Date;
}
