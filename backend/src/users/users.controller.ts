import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./schemas/users.schema";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CategoriesService } from "../categories/categories.service";
import { BudgetsService } from "../budgets/budgets.service";
import { MoneySourcesService } from "../money-sources/money-sources.service";
import { GoalsService } from "../goals/goals.service";
import { RecordsService } from "../records/records.service";
import { Category } from "../categories/schemas/category.schema";
import { Budget } from "../budgets/schemas/budget.schema";
import { MoneySource } from "../money-sources/schemas/money-source.schema";
import { Goal } from "../goals/schemas/goal.schema";
import { Record } from "../records/schemas/record.schema";

@Controller("users")
@ApiTags("Users")
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
    private readonly budgetsService: BudgetsService,
    private readonly moneySourcesService: MoneySourcesService,
    private readonly goalsService: GoalsService,
    private readonly recordsService: RecordsService
  ) {}

  @Get(":id")
  @ApiOperation({ summary: "Get a user by ID" })
  @ApiResponse({
    status: 200,
    description: "User with the given ID. Password will be omitted.",
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "User with the given ID is not found.",
  })
  @ApiParam({
    name: "id",
    description: "ID of a user",
    example: "60f4b7f9c3c3e4b5e4f5b7d9",
  })
  async findOne(@Param("id") id: string): Promise<Omit<User, "password">> {
    return this.usersService.findOne({ _id: id });
  }

  @Get(":id/categories")
  @ApiOperation({ summary: "Get all categories of a user by ID" })
  @ApiResponse({
    status: 200,
    description: "Categories of the user with the given ID.",
    type: [Category],
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiParam({
    name: "id",
    description: "ID of a user",
    example: "60f4b7f9c3c3e4b5e4f5b7d9",
  })
  async findCategoriesByUserId(@Param("id") id: string): Promise<Category[]> {
    return this.categoriesService.findByUserId(id);
  }

  @Get(":id/budgets")
  @ApiOperation({ summary: "Get all budgets of a user by ID" })
  @ApiResponse({
    status: 200,
    description: "Budgets of the user with the given ID.",
    type: [Budget],
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiParam({
    name: "id",
    description: "ID of a user",
    example: "60f4b7f9c3c3e4b5e4f5b7d9",
  })
  async findBudgetsByUserId(@Param("id") id: string): Promise<Budget[]> {
    const categories = await this.categoriesService.findByUserId(id);
    const budgets: Budget[] = [];
    for (const category of categories) {
      const budget = await this.budgetsService.findByCategoryId(category.id);
      if (budget !== null) {
        budgets.push(budget);
      }
    }
    return budgets;
  }

  @ApiOperation({ summary: "Get all money sources of a user by userId" })
  @ApiResponse({
    status: 200,
    description: "Info was successfully retrieved",
    type: [MoneySource],
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "User with the given ID is not found.",
  })
  @ApiParam({
    name: "id",
    description: "ID of a user",
    example: "60f4b7f9c3c3e4b5e4f5b7d9",
  })
  @Get(":id/money-sources")
  async findAllMoneySource(@Param("id") id: string): Promise<MoneySource[]> {
    return this.moneySourcesService.findByUserId(id);
  }

  @ApiOperation({ summary: "Get all goals of a user by userId" })
  @ApiResponse({
    status: 200,
    description: "Info was successfully retrieved",
    type: [Goal],
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "User with the given ID is not found.",
  })
  @ApiParam({
    name: "id",
    description: "ID of a user",
    example: "60f4b7f9c3c3e4b5e4f5b7d9",
  })
  @Get(":id/goals")
  async findAllGoal(@Param("id") id: string): Promise<Goal[]> {
    return this.goalsService.findByUserId(id);
  }

  @ApiOperation({ summary: "Get all goals of a user by userId" })
  @ApiResponse({
    status: 200,
    description: "Info was successfully retrieved",
    type: [Record],
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "User with the given ID is not found.",
  })
  @ApiParam({
    name: "id",
    description: "ID of a user",
    example: "60f4b7f9c3c3e4b5e4f5b7d9",
  })
  @Get(":id/records")
  async findAllRecord(@Param("id") id: string): Promise<Record[]> {
    const moneySources = await this.moneySourcesService.findByUserId(id);
    let records: Record[] = [];
    for (const moneySource of moneySources) {
      const record = await this.recordsService.findByMoneySourceId(
        moneySource.id
      );
      records = records.concat(record);
    }
    return records;
  }
}
