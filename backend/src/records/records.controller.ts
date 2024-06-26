import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { RecordsService } from "./records.service";
import { Record } from "./schemas/record.schema";
import { TransactionType } from "../types/transactions.type";
import { CreateRecordDto } from "./dto/create-record.dto";
import { UpdateRecordDto } from "./dto/update-record.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from "@nestjs/swagger";

@Controller("records")
@ApiTags("Records")
@ApiBearerAuth()
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new record" })
  @ApiResponse({
    status: 201,
    description: "The goal has been successfully added.",
    type: Record,
  })
  @ApiResponse({
    status: 400,
    description: "The required fields are missing or in invalid format.",
  })
  async create(@Body() createRecordDto: CreateRecordDto): Promise<Record> {
    return this.recordsService.create(createRecordDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all the records, filter by type if necessary" })
  @ApiResponse({
    status: 200,
    description: "All the record goals.",
    type: [Record],
  })
  @ApiQuery({ name: "type", enum: TransactionType, required: false })
  async findAll(@Query("type") type?: TransactionType): Promise<Record[]> {
    return this.recordsService.findAll(type);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a record by ID" })
  @ApiResponse({
    status: 200,
    description: "Record with the given ID.",
    type: Record,
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "There is no record with the given id.",
  })
  async findOne(@Param("id") id: string): Promise<Record> {
    return this.recordsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a record by ID" })
  @ApiResponse({
    status: 200,
    description: "The record with the given ID has been successfully updated.",
    type: Record,
  })
  @ApiResponse({
    status: 400,
    description: "The provided ids are invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "There is no record with the given id.",
  })
  async update(
    @Param("id") id: string,
    @Body() updateRecordDto: UpdateRecordDto
  ): Promise<Record> {
    return this.recordsService.update(id, updateRecordDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a record by ID" })
  @ApiResponse({
    status: 200,
    description: "The record with the given ID has been successfully deleted.",
    type: Record,
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "There is no record with the given id.",
  })
  async remove(@Param("id") id: string): Promise<Record> {
    return this.recordsService.remove(id);
  }
}
