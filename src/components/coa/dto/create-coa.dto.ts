import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateCoaDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    account_name:string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    account_code:number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    category_name:string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    category_code:number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    normal_balance:string;
 }
