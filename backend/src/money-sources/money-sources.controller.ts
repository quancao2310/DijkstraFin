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
import { MoneySourcesService } from "./money-sources.service";
import { MoneySource } from "./schemas/money-source.schema";
import { CreateMoneySourceDto } from "./dto/create-money-source.dto";
import { UpdateMoneySourceDto } from "./dto/update-money-source.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CheckUserIdInterceptor } from "../auth/auth.interceptor";
import { SkipCheckUserId } from "../auth/skip-check-user-id.decorator";

@Controller("money-sources")
@ApiTags("Money Sources")
@ApiBearerAuth()
@UseInterceptors(CheckUserIdInterceptor)
export class MoneySourcesController {
  constructor(private readonly moneySourceService: MoneySourcesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new money source" })
  @ApiResponse({
    status: 201,
    description: "The money source has been successfully added.",
    type: MoneySource,
  })
  @ApiResponse({
    status: 400,
    description: "The required fields are missing or in invalid format.",
  })
  @ApiResponse({
    status: 403,
    description: "You don\'t have permission to make this action!",
  })
  async create(
    @Body() createMoneySourceDto: CreateMoneySourceDto
  ): Promise<MoneySource> {
    return this.moneySourceService.create(createMoneySourceDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all the money sources" })
  @ApiResponse({
    status: 200,
    description: "All the money sources.",
    type: [MoneySource],
  })
  @SkipCheckUserId()
  async findAll(): Promise<MoneySource[]> {
    return this.moneySourceService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a money source by ID" })
  @ApiResponse({
    status: 200,
    description: "Money source with the given ID.",
    type: MoneySource,
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "There is no money source with the given id.",
  })
  @ApiResponse({
    status: 403,
    description: "You don\'t have permission to make this action!",
  })
  async findOne(@Param("id") id: string): Promise<MoneySource> {
    return this.moneySourceService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a money source by ID" })
  @ApiResponse({
    status: 200,
    description:
      "Money source with the given ID has been successfully updated.",
    type: MoneySource,
  })
  @ApiResponse({
    status: 400,
    description: "The provided ids are invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "There is no money source with the given id.",
  })
  @ApiResponse({
    status: 403,
    description: "You don\'t have permission to make this action!",
  })
  async update(
    @Param("id") id: string,
    @Body() updateMoneySourceDto: UpdateMoneySourceDto
  ): Promise<MoneySource> {
    return this.moneySourceService.update(id, updateMoneySourceDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a money source by ID" })
  @ApiResponse({
    status: 200,
    description:
      "The money source with the given ID has been successfully deleted.",
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "There is no money source with the given id.",
  })
  @ApiResponse({
    status: 403,
    description: "You don\'t have permission to make this action!",
  })
  async remove(@Param("id") id: string): Promise<MoneySource> {
    return this.moneySourceService.remove(id);
  }
}
