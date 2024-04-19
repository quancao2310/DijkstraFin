import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CatsService } from "./cats.service";
import { Cat } from "./schema/cat.schema";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";

@Controller("cats")
@ApiTags("For fun/test: Cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: "Create a cat." })
  @ApiCreatedResponse({
    description: "The cat has been successfully added.",
    type: Cat,
  })
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all the cats!" })
  @ApiOkResponse({
    description: "Cats. All of them!!!",
    type: [Cat],
  })
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a cat by ID." })
  @ApiOkResponse({
    description: "OK. Maybe 1 cat is enough.",
    type: Cat,
  })
  @ApiNotFoundResponse({
    description: "No cat found. 😿",
  })
  findOne(@Param("id") id: string): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a cat by ID" })
  @ApiOkResponse({
    description: "Update the cat.",
    type: Cat,
  })
  @ApiNotFoundResponse({
    description: "No cat found. 😿",
  })
  update(
    @Param("id") id: string,
    @Body() updateCatDto: UpdateCatDto
  ): Promise<Cat> {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Unalive a cat. Hehe." })
  @ApiOkResponse({
    description: "Oh no. Say goodbye to the little cat.",
    type: Cat,
  })
  @ApiNotFoundResponse({
    description: "No cat found. 😿",
  })
  remove(@Param("id") id: string): Promise<Cat> {
    return this.catsService.remove(id);
  }
}
