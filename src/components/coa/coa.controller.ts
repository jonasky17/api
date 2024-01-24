import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoaService } from './coa.service';
import { CreateCoaDto } from './dto/create-coa.dto';
import { UpdateCoaDto } from './dto/update-coa.dto';

@Controller('coa')
export class CoaController {
  constructor(private readonly coaService: CoaService) {}

  @Post()
  async create(@Body() createCoaDto: CreateCoaDto) {
    return await this.coaService.create(createCoaDto);
  }

  @Get()
  async findAll() {
    return await this.coaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoaDto: UpdateCoaDto) {
    return this.coaService.update(+id, updateCoaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coaService.remove(+id);
  }

  @Get('search/:key')
  async search(@Param('key') key:string){
    return await this.coaService.search(key);
  }

  @Patch('restore/:id')
  restore(@Param('id') id: string) {
    return this.coaService.restore(+id);
  }

  @Post('upload')
  async upload(@Body() data){
    return await this.coaService.upload(data);
  }
}