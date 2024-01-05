import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    OneToMany
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Expense } from "src/components/expenses/entities/expense.entity";

@Entity()
export class Supplier {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "123-456-789-12345", description: "maximum length 32", default:null })
    @Column({ length: 32, unique: false, default:null })
    tin: string

    @ApiProperty({ example: "TAB Work Solutions", description: "maximum length 128", default:null })
    @Column({ length: 128, unique: false, default:null })
    name: string

    @ApiProperty({ example: "07 Amistad st., Tropical Isaland, Benguet 2600", description: "maximum length 256", default:null })
    @Column({ length: 256, unique: false, default:null })
    address: string

    @DeleteDateColumn()
    deleted_at:Date

    @OneToMany(()=>Expense, expense=>expense.supplier,{nullable:false, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    expenses: Expense[];
}
