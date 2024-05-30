import { Body, Controller, Get, Query } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { GetRecordsFiltersDto } from "../records/dto/get-records-filters.dto";
import { SumarizeMoneySourceDto } from "./dto/sumarize-money-source.dto";
import { SumarizeCategoryDto } from "./dto/sumarize-category.dto";

@Controller("statistics")
@ApiTags("Statistics")
@ApiBearerAuth()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get("money-sources/records/sumarize")
  @ApiOperation({
    summary: "Sumarize records by money sources",
  })
  @ApiResponse({
    status: 200,
    description: "Sumarized records by money sources",
    type: [SumarizeMoneySourceDto],
  })
  @ApiQuery({
    name: "type",
    enum: ["income", "expense"],
  })
  @ApiQuery({
    name: "startDate",
    description: "The start date of the records, in the format of YYYY-MM-DD.",
    example: "2021-01-01",
    required: false,
  })
  @ApiQuery({
    name: "endDate",
    description: "The end date of the records, in the format of YYYY-MM-DD.",
    example: "2021-01-31",
    required: false,
  })
  async sumarizeByMoneySource(
    @Query() filters: GetRecordsFiltersDto,
    @Body("userId") userId: string
  ): Promise<SumarizeMoneySourceDto[]> {
    return this.statisticsService.sumarizeByMoneySource(userId, filters);
  }

  @Get("categories/records/sumarize")
  @ApiOperation({
    summary: "Sumarize records by categories",
  })
  @ApiResponse({
    status: 200,
    description: "Sumarized records by categories",
    type: [SumarizeCategoryDto],
  })
  @ApiQuery({
    name: "type",
    enum: ["income", "expense"],
  })
  @ApiQuery({
    name: "startDate",
    description: "The start date of the records, in the format of YYYY-MM-DD.",
    example: "2021-01-01",
    required: false,
  })
  @ApiQuery({
    name: "endDate",
    description: "The end date of the records, in the format of YYYY-MM-DD.",
    example: "2021-01-31",
    required: false,
  })
  async sumarizeByCategory(
    @Query() filters: GetRecordsFiltersDto,
    @Body("userId") userId: string
  ): Promise<SumarizeCategoryDto[]> {
    return this.statisticsService.sumarizeByCategory(userId, filters);
  }
}
