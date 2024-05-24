import { Test, TestingModule } from "@nestjs/testing";
import { MoneySourceController } from "./money-sources.controller";
import { MoneySourceService } from "./money-sources.service";

describe("MoneySourceController", () => {
  let controller: MoneySourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneySourceController],
      providers: [MoneySourceService],
    }).compile();

    controller = module.get<MoneySourceController>(MoneySourceController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
