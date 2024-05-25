import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MoneySource } from "./schemas/money-source.schema";
import { CreateMoneySourceDto } from "./dto/create-money-source.dto";
import { UpdateMoneySourceDto } from "./dto/update-money-source.dto";

@Injectable()
export class MoneySourcesService {
  constructor(
    @InjectModel(MoneySource.name) private moneySourceModel: Model<MoneySource>
  ) {}

  async create(
    createMoneySourceDto: CreateMoneySourceDto
  ): Promise<MoneySource> {
    const newMoneySource = new this.moneySourceModel(createMoneySourceDto);
    return await newMoneySource.save();
  }

  async findAll(): Promise<MoneySource[]> {
    return this.moneySourceModel.find().exec();
  }

  async findOne(id: string): Promise<MoneySource> {
    const moneySource = await this.moneySourceModel.findById(id).exec();
    if (!moneySource) {
      throw new NotFoundException(`No money source with id: ${id}.`);
    }
    return moneySource;
  }

  async findByUserId(userId: string): Promise<MoneySource[]> {
    return this.moneySourceModel.find({ userId }).exec();
  }

  async update(
    id: string,
    updateMoneySourceDto: UpdateMoneySourceDto
  ): Promise<MoneySource> {
    const moneySource = await this.moneySourceModel
      .findByIdAndUpdate(id, updateMoneySourceDto, { new: true })
      .exec();
    if (!moneySource) {
      throw new NotFoundException(`No money source with id: ${id}.`);
    }
    return moneySource;
  }

  async remove(id: string): Promise<MoneySource> {
    const moneySource = await this.moneySourceModel
      .findByIdAndDelete(id)
      .exec();
    if (!moneySource) {
      throw new NotFoundException(`No money source with id: ${id}.`);
    }
    return moneySource;
  }
}
