import { Test, TestingModule } from "@nestjs/testing";
import { MoneySourceService } from "./money-sources.service";

describe("MoneySourceService", () => {
  let service: MoneySourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoneySourceService],
    }).compile();

    service = module.get<MoneySourceService>(MoneySourceService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
