import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { SupplierExpenseDto } from './dto/supplier-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { EventLogsService } from '../event-logs/event-logs.service';
import { Profile } from '../profiles/entities/profile.entity';
import { Coa } from '../coa/entities/coa.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly repoExpense: Repository<Expense>,

    @InjectRepository(Profile)
    private readonly repoProfile: Repository<Profile>,

    @InjectRepository(Coa)
    private readonly repoCoa: Repository<Coa>,

    @InjectRepository(Supplier)
    private readonly repoSupplier: Repository<Supplier>,

    private readonly eventLogsService: EventLogsService
  ) { }
  async create(createExpenseDto: CreateExpenseDto) {
    try {
      console.log(createExpenseDto);
      const parentProfile = await this.repoProfile
        .createQueryBuilder()
        .where("id = :id", { id: createExpenseDto.profileId })
        .getOne();
      const parentCoa = await this.repoCoa
        .createQueryBuilder()
        .where("id = :id", { id: createExpenseDto.coaId })
        .getOne();
      const parentSupplier = await this.repoSupplier
        .createQueryBuilder()
        .where("id = :id", { id: createExpenseDto.supplierId })
        .getOne();
      const child = new Expense();
      child.profile = parentProfile;
      child.coa = parentCoa;
      child.supplier = parentSupplier;
      child.comment = createExpenseDto.comment;
      child.expense_date = createExpenseDto.expense_date;
      child.gross = createExpenseDto.gross;
      child.period = createExpenseDto.period;
      child.tax_type = createExpenseDto.tax_type;
      child.type = createExpenseDto.type;
      child.vat = createExpenseDto.vat;
      child.vatable = createExpenseDto.vatable
      const result = await this.repoExpense.save(child);
      if (result) {
        const logs = {
          action: "created",
          description: `New expense "${result.id}"`,
          user_id: 0
        }
        return {
          status: 200,
          error: "",
          data: [{ message: "New expense record created", id: `${result.id}` }]
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async supplierExpense(supplierExpenseDto: SupplierExpenseDto) {
    try {
      console.log(supplierExpenseDto);
      const parentProfile = await this.repoProfile
        .createQueryBuilder()
        .where("id = :id", { id: supplierExpenseDto.profileId })
        .getOne();
      const parentCoa = await this.repoCoa
        .createQueryBuilder()
        .where("id = :id", { id: supplierExpenseDto.coaId })
        .getOne();

      const newSupplier = new Supplier();
      newSupplier.tin = supplierExpenseDto.tin;
      newSupplier.address = supplierExpenseDto.address;
      newSupplier.name = supplierExpenseDto.name;
      const parentSupplier = await this.repoSupplier.save(newSupplier);
      if (parentSupplier) {
        const logs = {
          action: "created",
          description: `New supplier "${parentSupplier.id}"`,
          user_id: 0
        }
        const newLog = await this.eventLogsService.create(logs)
      }

      const child = new Expense();
      child.profile = parentProfile;
      child.coa = parentCoa;
      child.supplier = parentSupplier;
      child.comment = supplierExpenseDto.comment;
      child.expense_date = supplierExpenseDto.expense_date;
      child.gross = supplierExpenseDto.gross;
      child.period = supplierExpenseDto.period;
      child.tax_type = supplierExpenseDto.tax_type;
      child.type = supplierExpenseDto.type;
      child.vat = supplierExpenseDto.vat;
      child.vatable = supplierExpenseDto.vatable
      const result = await this.repoExpense.save(child);
      if (result) {
        const logs = {
          action: "created",
          description: `New expense "${result.id}"`,
          user_id: 0
        }
        const newLog = await this.eventLogsService.create(logs)
        return {
          status: 200,
          error: "",
          data: [{ message: "New expense record created", id: `${result.id}` }]
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async findAll(id) {
    try {
      const getAll = await this.repoExpense
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.supplier','supplier')
      .leftJoinAndSelect('e.coa','coa')
      .leftJoinAndSelect('e.profile','profile')
      .where('e.profile.id = :id',{id:id})
      .getMany();
      if (getAll) {
        return {
          status: 200,
          error: "",
          data: getAll
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async findByPeriod(period) {
    const unixTimestamp = period;
    const d = new Date(unixTimestamp * 1000);
    console.log(d);
    try {
      const getAll = await this.repoExpense
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.supplier','supplier')
      .leftJoinAndSelect('e.coa','coa')
      .leftJoinAndSelect('e.profile','profile')
      .where('e.period = :period',{period:d})
      .getMany();
      if (getAll) {
        return {
          status: 200,
          error: "",
          data: getAll
        }
      }
    } catch (err) {
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
