import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsDate, IsNumber } from "class-validator";
import { TransformDate } from "src/transformers/transformDate";
import { Transform } from "class-transformer";

export class CreateExpenseDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Transform(({value})=>{
        if(value instanceof Date){
            return `${value.getMonth()+1}-${value.getFullYear()}`;
        }
        return value;
    })
    period:string;

    @ApiProperty()
    @Transform(TransformDate)
    @IsDate()
    @IsOptional()
    expense_date: Date;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    supplierId:Number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    coaId:Number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    profileId:Number;  

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    type:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tax_type:string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    gross:number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    vatable:number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    vat:number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    comment:string;
}
