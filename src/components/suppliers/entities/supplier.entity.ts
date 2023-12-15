import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Supplier {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "123-456-789-12345", description: "maximum length 32" })
    @Column({ length: 32, unique: false })
    tin: string

    @ApiProperty({ example: "TAB Work Solutions", description: "maximum length 128" })
    @Column({ length: 128, unique: false })
    name: string

    @ApiProperty({ example: "07 Amistad st., Tropical Isaland, Benguet 2600", description: "maximum length 256" })
    @Column({ length: 256, unique: false })
    address: string

    @DeleteDateColumn()
    deleted_at:Date
}
