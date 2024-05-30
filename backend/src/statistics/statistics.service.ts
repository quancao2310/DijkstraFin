import { BadRequestException, Injectable } from "@nestjs/common";
import { CategoriesService } from "../categories/categories.service";
import { RecordsService } from "../records/records.service";
import { MoneySourcesService } from "../money-sources/money-sources.service";
import { GetRecordsFiltersDto } from "../records/dto/get-records-filters.dto";
import { SumarizeMoneySourceDto } from "./dto/sumarize-money-source.dto";
import { SumarizeCategoryDto } from "./dto/sumarize-category.dto";

@Injectable()
export class StatisticsService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly moneySourcesService: MoneySourcesService,
    private readonly recordsService: RecordsService
  ) {}

  private flatten<T>(arr: T[][]): T[] {
    return arr.reduce((acc, curr) => acc.concat(curr), []);
  }

  async sumarizeByMoneySource(
    userId: string,
    filters: GetRecordsFiltersDto
  ): Promise<SumarizeMoneySourceDto[]> {
    if (!filters.type) {
      throw new BadRequestException("Type is required.");
    }

    const moneySources = await this.moneySourcesService.findByUserId(userId);
    const result: SumarizeMoneySourceDto[] = await Promise.all(
      moneySources.map(async (moneySource) => {
        const records = await this.recordsService.findByMoneySourceId(
          moneySource.id,
          filters
        );
        return {
          moneySource: moneySource,
          sum: records.reduce((acc, record) => acc + record.amount, 0),
        };
      })
    );
    return result;
  }

  async sumarizeByCategory(
    userId: string,
    filters: GetRecordsFiltersDto
  ): Promise<SumarizeCategoryDto[]> {
    if (!filters.type) {
      throw new BadRequestException("Type is required.");
    }

    const categories = await this.categoriesService.findByUserId(userId);
    const result = await Promise.all(
      categories.map(async (category) => {
        const records = await this.recordsService.findByCategoryId(
          category.id,
          filters
        );
        return {
          category: category,
          sum: records.reduce((acc, record) => acc + record.amount, 0),
        };
      })
    );
    return result;
  }
}
