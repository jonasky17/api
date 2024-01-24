import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
}from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Supplier } from "src/components/suppliers/entities/supplier.entity";
import { Coa } from "src/components/coa/entities/coa.entity";
import { Profile } from "src/components/profiles/entities/profile.entity";

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    id:number;

    // @ApiProperty({ example: "1", description: "Profile id" })
    // @Column({unique:false, nullable:false, default:0})
    // profileId:number;

    // @ApiProperty({ example: "1", description: "supplier id" })
    // @Column({unique:false, nullable:false, default:0})
    // supplierId:number;

    @ApiProperty({ example: "01/01/2023", description: "date of transaction" })
    @Column({unique:false, nullable:true, default:null})
    expense_date:Date;

    // @ApiProperty({ example: "1", description: "Chart of Accounts id" })
    // @Column({unique:false, nullable:false, default:0})
    // coaId:number;

    @ApiProperty({ example: "goods", description: "maximum length 16" })
    @Column({unique:false, nullable:false, length:16, default:"n/a"})
    type:string;

    @ApiProperty({ example: "vat", description: "maximum length 8" })
    @Column({unique:false, nullable:false, length:8, default:"n/a"})
    tax_type:string;

    @ApiProperty({ example: "100.00", description: "maximum length 12" })
    @Column('decimal',{precision:12,scale:2, default:"0.00"})
    gross:number;

    @ApiProperty({ example: "100.00", description: "maximum length 12" })
    @Column('decimal',{precision:12,scale:2, default:"0.00"})
    vatable:number;

    @ApiProperty({ example: "100.00", description: "maximum length 12" })
    @Column('decimal',{precision:12,scale:2, default:"0.00"})
    vat:number;

    @ApiProperty({ example: "vat", description: "long text" })
    @Column('text',{nullable:true})
    comment:string;

    @DeleteDateColumn()
    deleted_at:Date;

    // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @CreateDateColumn({ type: 'timestamp' })
    created_at:string;

    
    @ApiProperty({ example: "2022-12-31T16:00:00.000Z", description: "maximum length 32" })
    @Column({unique:false, nullable:false, default:"n/a"})
    period:string

    @ManyToOne(()=>Supplier, supplier=>supplier.expenses, {nullable:false, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name:'supplierId'})
    supplier:Supplier;

    @ManyToOne(()=>Coa, coa=>coa.expenses, {nullable:false, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name:'coaId'})
    coa:Coa;

    @ManyToOne(()=>Profile, profile=>profile.expenses, {nullable:false, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name:'profileId'})
    profile:Profile;
}
