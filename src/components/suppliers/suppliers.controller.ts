import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

import {
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) { }

  @Post()
  @ApiOperation({ summary: 'Create supplier' })
  @ApiResponse({
    status: 204,
    description: 'New supplier created!'
  })
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    return await this.suppliersService.create(createSupplierDto)
      .catch(err => {
        throw new HttpException({
          status: 500,
          error: "Something went wrong!",
          data: [{ errorno: err.errno, code: err.code }]
        }, HttpStatus.BAD_REQUEST)
      });
  }

  @Get()
  findAll() {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(+id);
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() data: UpdateSupplierDto) {
    return await this.suppliersService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.suppliersService.remove(+id);
  }

  @Patch('restore/:id')
  restore(@Param('id') id: string) {
    return this.suppliersService.restore(+id);
  }

  @Get('search/:key')
  async search(@Param('key') key:string){
    return await this.suppliersService.search(key);
  }

  @Post('upload')
  async upload(@Body() data){
    return await this.suppliersService.upload(data);
  }
}
