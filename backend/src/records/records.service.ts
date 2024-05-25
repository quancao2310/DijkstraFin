import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Query } from "mongoose";
import { Record } from "./schemas/record.schema";
import { TransactionType } from "../types/transactions.type";
import { CreateRecordDto } from "./dto/create-record.dto";
import { UpdateRecordDto } from "./dto/update-record.dto";

@Injectable()
export class RecordsService {
  constructor(@InjectModel(Record.name) private recordModel: Model<Record>) {}

  async create(createRecordDto: CreateRecordDto): Promise<Record> {
    const newRecord = new this.recordModel(createRecordDto);
    return await newRecord.save();
  }

  async findAll(type?: TransactionType): Promise<Record[]> {
    let query: Query<Record[], Record>;
    if (type !== undefined) {
      query = this.recordModel.find({ type: type });
    } else {
      query = this.recordModel.find();
    }
    return query.sort({ _id: -1 }).exec();
  }

  async findOne(id: string): Promise<Record> {
    const record = await this.recordModel.findById(id).exec();
    if (!record) {
      throw new NotFoundException(`No record with id: ${id}.`);
    }
    return record;
  }

  async findByUserId(userId: string): Promise<Record[]> {
    return this.recordModel.find({ userId }).sort({ _id: -1 }).exec();
  }

  async update(id: string, updateRecordDto: UpdateRecordDto): Promise<Record> {
    const record = await this.recordModel
      .findByIdAndUpdate(id, updateRecordDto, { new: true })
      .exec();
    if (!record) {
      throw new NotFoundException(`No record with id: ${id}.`);
    }
    return record;
  }

  async remove(id: string): Promise<Record> {
    const record = await this.recordModel.findByIdAndDelete(id);
    if (!record) {
      throw new NotFoundException(`No record with id: ${id}.`);
    }
    return record;
  }
}
