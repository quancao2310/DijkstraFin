import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Patch,
  Delete,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { Category } from "./schemas/category.schema";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";

@Controller("categories")
@ApiTags("Categories")
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new category" })
  @ApiResponse({
    status: 201,
    description: "The category has been successfully added.",
    type: Category,
  })
  @ApiResponse({
    status: 400,
    description: "The required fields are missing or in invalid format.",
  })
  async create(
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all the categories" })
  @ApiResponse({
    status: 200,
    description: "All the default categories.",
    type: [Category],
  })
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a category by ID" })
  @ApiResponse({
    status: 200,
    description: "Category with the given ID.",
    type: Category,
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "There is no category with the given id.",
  })
  async findOne(@Param("id") id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a category by ID" })
  @ApiResponse({
    status: 200,
    description: "The category has been successfully updated.",
    type: Category,
  })
  @ApiResponse({
    status: 400,
    description: "The provided ids are invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "There is no category with the given id.",
  })
  async update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a category by ID" })
  @ApiResponse({
    status: 200,
    description: "The category has been successfully deleted.",
    type: Category,
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "There is no category with the given id.",
  })
  async remove(@Param("id") id: string): Promise<Category> {
    return this.categoriesService.remove(id);
  }
}
