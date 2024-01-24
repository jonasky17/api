import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateSupplierDto {
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
