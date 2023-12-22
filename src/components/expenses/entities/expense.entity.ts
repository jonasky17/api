import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    CreateDateColumn
}from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty({ example: "1", description: "Chart of Accounts id" })
    @Column({unique:false, nullable:false})
    profileId:number;

    @ApiProperty({ example: "1", description: "supplier id" })
    @Column({unique:false, nullable:false})
    supplierId:number;

    @ApiProperty({ example: "01/01/2023", description: "date of transaction" })
    @Column({unique:false, nullable:true, default:null})
    expense_date:Date;

    @ApiProperty({ example: "1", description: "Chart of Accounts id" })
    @Column({unique:false, nullable:false})
    coaId:number;

    @ApiProperty({ example: "goods", description: "maximum length 16" })
    @Column({unique:false, nullable:false, length:16})
    type:string;

    @ApiProperty({ example: "vat", description: "maximum length 8" })
    @Column({unique:false, nullable:false, length:8})
    tax_type:string;

    @ApiProperty({ example: "100.00", description: "maximum length 12" })
    @Column('decimal',{precision:12,scale:2})
    gross:number;

    @ApiProperty({ example: "100.00", description: "maximum length 12" })
    @Column('decimal',{precision:12,scale:2})
    vatable:number;

    @ApiProperty({ example: "100.00", description: "maximum length 12" })
    @Column('decimal',{precision:12,scale:2})
    vat:number;

    @ApiProperty({ example: "vat", description: "long text" })
    @Column('text')
    comment:string;

    @DeleteDateColumn()
    deleted_at:Date;

    // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @CreateDateColumn({ type: 'timestamp' })
    created_at:string;

}
