import { Test, TestingModule } from "@nestjs/testing";
import { MoneySourcesController } from "./money-sources.controller";
import { MoneySourceService } from "./money-sources.service";

describe("MoneySourcesController", () => {
  let controller: MoneySourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneySourcesController],
      providers: [MoneySourceService],
    }).compile();

    controller = module.get<MoneySourcesController>(MoneySourcesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
