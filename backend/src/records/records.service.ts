import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Query } from "mongoose";
import { Record } from "./schemas/record.schema";
import { TransactionType } from "../types";
import { CreateRecordDto } from "./dto/create-record.dto";
import { UpdateRecordDto } from "./dto/update-record.dto";
import { CategoriesService } from "../categories/categories.service";
import { MoneySourcesService } from "../money-sources/money-sources.service";
import { GoalsService } from "../goals/goals.service";
import { BudgetsService } from "../budgets/budgets.service";

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record.name) private recordModel: Model<Record>,
    private categoriesService: CategoriesService,
    private moneySourcesService: MoneySourcesService,
    private goalsService: GoalsService,
    private budgetsService: BudgetsService
  ) {}

  async create(createRecordDto: CreateRecordDto): Promise<Record> {
    const newRecord = new this.recordModel(createRecordDto);
    await newRecord.validate();
    if (
      createRecordDto.type === TransactionType.EXPENSE ||
      createRecordDto.type === TransactionType.SAVING
    ) {
      // Update balance
      const moneySource = await this.moneySourcesService.findOne(
        createRecordDto.moneySourceId
      );
      if (moneySource.balance < createRecordDto.amount) {
        throw new BadRequestException("Not enough balance.");
      }
      await this.moneySourcesService.update(createRecordDto.moneySourceId, {
        balance: moneySource.balance - createRecordDto.amount,
      });

      if (createRecordDto.type === TransactionType.EXPENSE) {
        // Update budget if category has budget
        const category = await this.categoriesService.findOne(
          createRecordDto.categoryId
        );
        if (category.budgetId !== null) {
          const budget = await this.budgetsService.findOne(
            category.budgetId.toString()
          );
          await this.budgetsService.update(category.budgetId.toString(), {
            currentSpent: budget.currentSpent + createRecordDto.amount,
          });
        }
      } else {
        // Update goal
        if (!createRecordDto.goalId) {
          throw new BadRequestException(
            "Goal ID is required for saving records."
          );
        }
        const goal = await this.goalsService.findOne(createRecordDto.goalId);
        const isCompleted = goal.balance + createRecordDto.amount >= goal.total;
        const updatedGoal = await this.goalsService.update(
          createRecordDto.goalId,
          {
            balance: goal.balance + createRecordDto.amount,
            isCompleted,
          }
        );
        if (isCompleted) {
          // Update balance if goal is completed
          const moneySource = await this.moneySourcesService.findOne(
            goal.moneySourceId.toString()
          );
          await this.moneySourcesService.update(goal.moneySourceId.toString(), {
            balance: moneySource.balance + updatedGoal.balance,
          });
        }
      }
    } else {
      // Update balance
      const moneySource = await this.moneySourcesService.findOne(
        createRecordDto.moneySourceId
      );
      await this.moneySourcesService.update(createRecordDto.moneySourceId, {
        balance: moneySource.balance + createRecordDto.amount,
      });
    }
    return await newRecord.save();
  }

  async findAll(type?: TransactionType): Promise<Record[]> {
    let query: Query<Record[], Record>;
    if (type !== undefined) {
      query = this.recordModel.find({ type: type });
    } else {
      query = this.recordModel.find();
    }
    return query.sort({ _id: -1 }).exec();
  }

  async findOne(id: string): Promise<Record> {
    const record = await this.recordModel.findById(id).exec();
    if (!record) {
      throw new NotFoundException(`No record with id: ${id}.`);
    }
    return record;
  }

  async findByMoneySourceId(moneySourceId: string): Promise<Record[]> {
    return this.recordModel.find({ moneySourceId }).sort({ _id: -1 }).exec();
  }

  async update(id: string, updateRecordDto: UpdateRecordDto): Promise<Record> {
    const record = await this.recordModel
      .findByIdAndUpdate(id, updateRecordDto, { new: true })
      .exec();
    if (!record) {
      throw new NotFoundException(`No record with id: ${id}.`);
    }
    return record;
  }

  async remove(id: string): Promise<Record> {
    const record = await this.recordModel.findByIdAndDelete(id);
    if (!record) {
      throw new NotFoundException(`No record with id: ${id}.`);
    }
    return record;
  }
}
