import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from "@nestjs/common";
import { GoalsService } from "./goals.service";
import { Goal } from "./schemas/goal.schema";
import { CreateGoalDto } from "./dto/create-goal.dto";
import { UpdateGoalDto } from "./dto/update-goal.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CheckUserIdInterceptor } from "../auth/auth.interceptor";
import { SkipCheckUserId } from "../auth/skip-check-user-id.decorator";

@Controller("goals")
@ApiTags("Goals")
@ApiBearerAuth()
@UseInterceptors(CheckUserIdInterceptor)
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new goal" })
  @ApiResponse({
    status: 201,
    description: "The goal has been successfully added.",
    type: Goal,
  })
  @ApiResponse({
    status: 400,
    description: "The required fields are missing or in invalid format.",
  })
  @ApiResponse({
    status: 403,
    description: "You don\'t have permission to make this action!",
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
  @SkipCheckUserId()
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
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "There is no goal with the given id.",
  })
  @ApiResponse({
    status: 403,
    description: "You don\'t have permission to make this action!",
  })
  async findOne(@Param("id") id: string): Promise<Goal> {
    return this.goalsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a goal by ID" })
  @ApiResponse({
    status: 200,
    description: "The goal has been successfully updated.",
    type: Goal,
  })
  @ApiResponse({
    status: 400,
    description: "The provided ids are invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "There is no goal with the given id.",
  })
  @ApiResponse({
    status: 403,
    description: "You don\'t have permission to make this action!",
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
    description: "The goal has been successfully deleted.",
    type: Goal,
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "There is no goal with the given id.",
  })
  @ApiResponse({
    status: 403,
    description: "You don\'t have permission to make this action!",
  })
  async remove(@Param("id") id: string): Promise<Goal> {
    return this.goalsService.remove(id);
  }
}
