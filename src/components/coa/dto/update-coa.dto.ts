import { PartialType } from '@nestjs/swagger';
import { CreateCoaDto } from './create-coa.dto';

export class UpdateCoaDto extends PartialType(CreateCoaDto) {}
