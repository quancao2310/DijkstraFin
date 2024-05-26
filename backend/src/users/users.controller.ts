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
import { Category } from "../categories/schemas/category.schema";
import { Budget } from "../budgets/schemas/budget.schema";

@Controller("users")
@ApiTags("Users")
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
    private readonly budgetsService: BudgetsService
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
}
