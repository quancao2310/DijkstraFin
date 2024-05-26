import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Budget } from "./schemas/budget.schema";
import { CreateBudgetDto } from "./dto/create-budget.dto";
import { UpdateBudgetDto } from "./dto/update-budget.dto";
import { CategoriesService } from "../categories/categories.service";
import { TransactionType } from "../types";

@Injectable()
export class BudgetsService {
  constructor(
    @InjectModel(Budget.name) private budgetModel: Model<Budget>,
    private categoriesService: CategoriesService
  ) {}

  async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    const category = await this.categoriesService.findOne(
      createBudgetDto.categoryId
    );
    if (category.budgetId !== null)
      throw new BadRequestException("Category already have budget.");
    if (category.type !== TransactionType.EXPENSE)
      throw new BadRequestException("Invalid category type.");

    const newBudget = new this.budgetModel(createBudgetDto);
    return await newBudget.save();
  }

  async findAll(): Promise<Budget[]> {
    return this.budgetModel.find().exec();
  }

  async findOne(id: string): Promise<Budget> {
    const budget = await this.budgetModel.findById(id).exec();
    if (!budget) {
      throw new NotFoundException(`No budget with id: ${id}.`);
    }
    return budget;
  }

  async findByCategoryId(categoryId: string): Promise<Budget> {
    return this.budgetModel.findOne({ categoryId }).exec();
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    const budget = await this.budgetModel
      .findByIdAndUpdate(id, updateBudgetDto, { new: true })
      .exec();
    if (!budget) {
      throw new NotFoundException(`No budget with id: ${id}.`);
    }
    return budget;
  }

  async remove(id: string): Promise<Budget> {
    const budget = await this.budgetModel.findByIdAndDelete(id).exec();
    if (!budget) {
      throw new NotFoundException(`No budget with id: ${id}.`);
    }
    return budget;
  }
}
