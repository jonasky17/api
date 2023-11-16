import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "admin", description: 'maximum length of 64' })
    @Column({ length: 64, unique: true })
    username: string;

    @ApiProperty({ example: "mypassword", description: 'encrypted' })
    @Column({ length: 128 })
    password: string;

    @ApiProperty({ example: "2020-01-01 10:10:10", description: 'current timestamp' })
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ApiProperty({ example: "true", description: 'indicate if the user is still active or deactivated' })
    @Column({ default: true })
    isActive: boolean;

    @ApiProperty({ example: "superadmin", description: 'to detrermine the level of access for the current user' })
    @Column()
    role:string;

    @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", description: 'encoded token' })
    @Column({ nullable: true })
    authStrategy: string;
}
