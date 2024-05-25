import { Test, TestingModule } from "@nestjs/testing";
import { MoneySourcesService } from "./money-sources.service";

describe("MoneySourcesService", () => {
  let service: MoneySourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoneySourcesService],
    }).compile();

    service = module.get<MoneySourcesService>(MoneySourcesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
