import { PartialType } from "@nestjs/swagger";
import { CreateMoneySourceDto } from "./create-money-source.dto";

export class UpdateMoneySourceDto extends PartialType(CreateMoneySourceDto) {}
