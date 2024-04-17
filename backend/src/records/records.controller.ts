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
import { CreateRecordDto } from "./dto/create-record.dto";
import { UpdateRecordDto } from "./dto/update-record.dto";
import { Record } from "./schema/record.schema";

@Controller("records")
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  async create(@Body() createRecordDto: CreateRecordDto): Promise<Record> {
    return this.recordsService.create(createRecordDto);
  }

  @Get()
  async findAll(@Query("type") type?: "income" | "expense"): Promise<Record[]> {
    return this.recordsService.findAll(type);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Record> {
    return this.recordsService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateRecordDto: UpdateRecordDto
  ): Promise<Record> {
    return this.recordsService.update(id, updateRecordDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<Record> {
    return this.recordsService.remove(id);
  }
}
