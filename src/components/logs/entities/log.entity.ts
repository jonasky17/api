import{PrimaryGeneratedColumn, Column, Entity} from 'typeorm';
import{ApiProperty} from '@nestjs/swagger/dist';

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty({example:"updated", description:'Action made'})
    @Column({length:16})
    action:string;

    @ApiProperty({example:"updated a record", description:'description of the action made'})
    @Column({type:"text"})
    description:string;

    @ApiProperty({example:1,description:"user id"})
    @Column()
    user_id:number;
}
