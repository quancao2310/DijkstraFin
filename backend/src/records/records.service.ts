import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Query } from "mongoose";
import { Record } from "./schema/record.schema";
import { RecordType } from "./types/records.type";
import { CreateRecordDto } from "./dto/create-record.dto";
import { UpdateRecordDto } from "./dto/update-record.dto";

@Injectable()
export class RecordsService {
  constructor(@InjectModel(Record.name) private recordModel: Model<Record>) {}

  async create(createRecordDto: CreateRecordDto): Promise<Record> {
    try {
      const newModel = new this.recordModel(createRecordDto);
      return await newModel.save();
    } catch (err) {
      throw new BadRequestException({
        message: "The required fields are missing.",
      });
    }
  }

  async findAll(type?: RecordType): Promise<Record[]> {
    let query: Query<Record[], Record>;
    if (type !== undefined) {
      query = this.recordModel.find({ type: type });
    } else {
      query = this.recordModel.find();
    }
    return query.sort({ date: -1 }).exec();
  }

  async findOne(id: string): Promise<Record> {
    try {
      const record = await this.recordModel.findById(id).exec();

      if (!record) {
        throw new Error();
      }

      return record;
    } catch (err) {
      throw new NotFoundException({ message: `No record with id: ${id}.` });
    }
  }

  async update(id: string, updateRecordDto: UpdateRecordDto): Promise<Record> {
    try {
      const record = await this.recordModel
        .findByIdAndUpdate(id, updateRecordDto, { new: true })
        .exec();

      if (!record) {
        throw new Error();
      }

      return record;
    } catch (err) {
      throw new NotFoundException({ message: `No record with id: ${id}.` });
    }
  }

  async remove(id: string): Promise<Record> {
    try {
      const record = await this.recordModel.findByIdAndDelete(id);

      if (!record) {
        throw new Error();
      }

      return record;
    } catch (err) {
      throw new NotFoundException({ message: `No record with id: ${id}.` });
    }
  }
}
