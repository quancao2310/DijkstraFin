import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { GoalsService } from "./goals.service";
import { Goal } from "./schema/goal.schema";
import { CreateGoalDto } from "./dto/create-goal.dto";
import { UpdateGoalDto } from "./dto/update-goal.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("goals")
@ApiTags("Goals")
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new goal, either budget or saving" })
  @ApiResponse({
    status: 201,
    description: "The goal has been successfully added.",
    type: Goal,
  })
  async create(@Body() createGoalDto: CreateGoalDto): Promise<Goal> {
    return this.goalsService.create(createGoalDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all the goals" })
  @ApiResponse({
    status: 200,
    description: "All the created goals.",
    type: [Goal],
  })
  async findAll(): Promise<Goal[]> {
    return this.goalsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a goal by ID" })
  @ApiResponse({
    status: 200,
    description: "Goal with the given ID.",
    type: Goal,
  })
  @ApiResponse({
    status: 404,
    description: "There is no goal with the given id.",
  })
  async findOne(@Param("id") id: string): Promise<Goal> {
    return this.goalsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a goal by ID" })
  @ApiResponse({
    status: 200,
    description: "The goal with the given ID has been successfully updated.",
    type: Goal,
  })
  @ApiResponse({
    status: 404,
    description: "There is no goal with the given id.",
  })
  async update(
    @Param("id") id: string,
    @Body() updateGoalDto: UpdateGoalDto
  ): Promise<Goal> {
    return this.goalsService.update(id, updateGoalDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a goal by ID" })
  @ApiResponse({
    status: 200,
    description: "The goal with the given ID has been successfully deleted.",
    type: Goal,
  })
  @ApiResponse({
    status: 404,
    description: "There is no goal with the given id.",
  })
  async remove(@Param("id") id: string): Promise<Goal> {
    return this.goalsService.remove(id);
  }
}
