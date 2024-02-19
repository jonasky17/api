import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { SupplierExpenseDto } from './dto/supplier-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) { }

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Post('supplier')
  createWithSupplier(@Body() supplierExpenseDto: SupplierExpenseDto) {
    return this.expensesService.supplierExpense(supplierExpenseDto);
  }

  @Get('summary/:id')
  async findAll(@Param('id') id: Number) {
    return await this.expensesService.findAll(id);
  }

  @Get('export/:id/:period')
  async findByPeriod(
    @Param('id') id: number,
    @Param('period') period: string
    ) {
      console.log(period);
      console.log(id);
    return await this.expensesService.findByPeriod(id,period);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(+id);
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return await this.expensesService.update(+id, updateExpenseDto);
  }

  @Patch('supplier/:id')
  async updateExpenseSupplier(@Param('id') id: string, @Body() supplierExpenseDto: SupplierExpenseDto) {
    return await this.expensesService.updateExpenseSupplier(+id, supplierExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }
}
