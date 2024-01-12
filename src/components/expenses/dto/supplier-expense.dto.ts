import { PartialType } from '@nestjs/swagger';
import { CreateExpenseDto } from './create-expense.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class SupplierExpenseDto extends PartialType(CreateExpenseDto) {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tin:string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    name:string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    address:string;
}

