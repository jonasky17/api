import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    CreateDateColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Coa {
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty({ example: "Cash on hand", description: "maximum length 64" })
    @Column({length:64, unique:true})
    account_name:string;

    @ApiProperty({ example: "Assets", description: "maximum length 64" })
    @Column({length:64, unique:false, nullable:true})
    category_name:string;

    @ApiProperty({example: "1111000", description: "7 digit number" })
    @Column({ unique:false, default:0, nullable:true})
    account_code:Number;

    @ApiProperty({ example: "1", description: "1 digit number" })
    @Column({unique:false, default:0,  nullable:true})
    category_code:Number;

    @ApiProperty({ example: "Debit", description: "maximum length 16" })
    @Column({length:16, unique:false})
    normal_balance:string;

    @DeleteDateColumn()
    deleted_at:Date;

    // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @CreateDateColumn({ type: 'timestamp' })
    created_at:string;

}
