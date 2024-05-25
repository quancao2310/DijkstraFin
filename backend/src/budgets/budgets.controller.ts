import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BudgetsService } from "./budgets.service";
import { Budget } from "./schemas/budget.schema";
import { CreateBudgetDto } from "./dto/create-budget.dto";
import { UpdateBudgetDto } from "./dto/update-budget.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("budgets")
@ApiTags("Budgets")
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new budget" })
  @ApiResponse({
    status: 201,
    description: "The budget has been successfully added.",
    type: Budget,
  })
  @ApiResponse({
    status: 400,
    description: "The required fields are missing or in invalid format.",
  })
  async create(@Body() createBudgetDto: CreateBudgetDto): Promise<Budget> {
    return this.budgetsService.create(createBudgetDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all the budgets" })
  @ApiResponse({
    status: 200,
    description: "All the budgets.",
    type: [Budget],
  })
  async findAll(): Promise<Budget[]> {
    return this.budgetsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a budget by ID" })
  @ApiResponse({
    status: 200,
    description: "Budget with the given ID.",
    type: Budget,
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "No budget with the given ID was found.",
  })
  async findOne(@Param("id") id: string): Promise<Budget> {
    return this.budgetsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a budget by ID" })
  @ApiResponse({
    status: 200,
    description: "The budget has been successfully updated.",
    type: Budget,
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "No budget with the given ID was found.",
  })
  async update(
    @Param("id") id: string,
    @Body() updateBudgetDto: UpdateBudgetDto
  ): Promise<Budget> {
    return this.budgetsService.update(id, updateBudgetDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a budget by ID" })
  @ApiResponse({
    status: 200,
    description: "The budget has been successfully deleted.",
    type: Budget,
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "No budget with the given ID was found.",
  })
  async remove(@Param("id") id: string): Promise<Budget> {
    return this.budgetsService.remove(id);
  }
}
