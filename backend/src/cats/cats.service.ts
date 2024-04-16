import { Injectable } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
// import { UpdateCatDto } from "./dto/update-cat.dto";
import { Model } from "mongoose";
import { Cat } from "./schema/cat.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  create(createCatDto: CreateCatDto) {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  // findAll() {
  //   return `This action returns all cats`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} cat`;
  // }

  // update(id: number, updateCatDto: UpdateCatDto) {
  //   return `This action updates a #${id} cat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} cat`;
  // }
}
