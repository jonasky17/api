import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    CreateDateColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty({ example: "123-456-789-12345", description: "maximum length 32" })
    @Column({length:32, unique:true})
    tin:string;

    @ApiProperty({ example: "TAB Work Solutions", description: "maximum length 128", default: null })
    @Column({length:128, unique:false})
    name: string;

    @ApiProperty({ example: "07 Amistad st., Tropical Island, Benguet 2600", description: "maximum length 256", default:null })
    @Column({length:256, unique: false, nullable:true})
    address: string;

    @DeleteDateColumn()
    deleted_at:Date;

    // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @CreateDateColumn({ type: 'timestamp' })
    created_at:string;

    @ApiProperty({ example: "sample@email.com", description: "maximum length 64" })
    @Column({length:64, nullable:true})
    email:string;

    @ApiProperty({ example: "09101010101", description: "maximum length 16" })
    @Column({length:16, nullable:true})
    contact:string;

    @ApiProperty({ example: "01-01-2023", description: "date when business was registered" })
    @Column({nullable:true, default:null})
    date_registered:Date;
}
