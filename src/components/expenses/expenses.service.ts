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
        .leftJoinAndSelect('e.supplier', 'supplier')
        .leftJoinAndSelect('e.coa', 'coa')
        .leftJoinAndSelect('e.profile', 'profile')
        .where('e.profile.id = :id', { id: id })
        .orderBy('e.id',"DESC")
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

  formatDateToCustomString(date) {
    const isoString = date.toISOString();
    // Extracting the date and time parts
    const datePart = isoString.slice(0, 10);
    const timePart = isoString.slice(11, 19);
    // Constructing the custom format
    const customFormat = `${datePart}T${timePart}${isoString.slice(19)}`;
    return customFormat;
  }

  async findByPeriod(id,period) {
    
    const unixTimestamp = period;
    const d = new Date(unixTimestamp * 1000);

    const currentDate = new Date(d);
    const formattedDate = this.formatDateToCustomString(currentDate);

    try {
      const getAll = await this.repoExpense
        .createQueryBuilder('e')
        .leftJoinAndSelect('e.supplier', 'supplier')
        .leftJoinAndSelect('e.coa', 'coa')
        .leftJoinAndSelect('e.profile', 'profile')
        .where('e.period = :period', { period: formattedDate })
        .andWhere('e.profileId = :profileId',{profileId: id})
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

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    try {
      const parentProfile = await this.repoProfile
        .createQueryBuilder()
        .where("id = :id", { id: updateExpenseDto.profileId })
        .getOne();
      const parentCoa = await this.repoCoa
        .createQueryBuilder()
        .where("id = :id", { id: updateExpenseDto.coaId })
        .getOne();
      const parentSupplier = await this.repoSupplier
        .createQueryBuilder()
        .where("id = :id", { id: updateExpenseDto.supplierId })
        .getOne();
      const child = new Expense();
      child.profile = parentProfile;
      child.coa = parentCoa;
      child.supplier = parentSupplier;
      child.comment = updateExpenseDto.comment;
      child.expense_date = updateExpenseDto.expense_date;
      child.gross = updateExpenseDto.gross;
      child.period = updateExpenseDto.period;
      child.tax_type = updateExpenseDto.tax_type;
      child.type = updateExpenseDto.type;
      child.vat = updateExpenseDto.vat;
      child.vatable = updateExpenseDto.vatable;
      child.id = id;
      const result = await this.repoExpense.save(child);
      if (result) {
        const logs = {
          action: "update",
          description: `updated expense ${id}`,
          user_id: 0
        }
        await this.eventLogsService.create(logs);
        return {
          status: 200,
          error: "",
          data: [{ message: "Expense updated!" }]
        }
      }
    } catch (err) {
      throw err
    }

  }

  async updateExpenseSupplier(id: number, supplierExpenseDto: SupplierExpenseDto) {
    try {
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
      console.log(newSupplier);
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
      child.vatable = supplierExpenseDto.vatable;
      child.id = id;
      const result = await this.repoExpense.save(child);
      if (result) {
        const logs = {
          action: "update",
          description: `updated expense ${id}`,
          user_id: 0
        }
        await this.eventLogsService.create(logs);
        return {
          status: 200,
          error: "",
          data: [{ message: "Expense updated!" }]
        }
      }
    } catch (err) {
      throw err
    }

  }

  async remove(id: number) {
    try {
      const result = await this.repoExpense
        .createQueryBuilder()
        .softDelete()
        .where("id = :id", { id: id })
        .execute();
      if (result) {
        const logs = {
          action: "delete",
          description: `deleted expense ${id}`,
          user_id: 0
        }
        await this.eventLogsService.create(logs);
        return {
          status: 200,
          error: "",
          data: [{ message: "Expense deleted!" }]
        }
      }
    } catch (err) {
      throw err;
    }

  }
}
