import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cat } from "./schema/cat.schema";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  findOne(id: string) {
    return this.catModel.findById(id).exec();
  }

  update(id: string, updateCatDto: UpdateCatDto) {
    return this.catModel.findByIdAndUpdate(id, updateCatDto);
  }

  remove(id: string) {
    return this.catModel.findByIdAndDelete(id);
  }
}
