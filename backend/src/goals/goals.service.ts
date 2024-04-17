import { Injectable } from "@nestjs/common";
import { CreateGoalDto } from "./dto/create-goal.dto";
import { UpdateGoalDto } from "./dto/update-goal.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Goal } from "./schema/goal.schema";
@Injectable()
export class GoalsService {
  constructor(@InjectModel(Goal.name) private goalModel: Model<Goal>) {}
  async create(createGoalDto: CreateGoalDto): Promise<Goal> {
    const newGoal = new this.goalModel(createGoalDto);
    return newGoal.save();
  }

  async findAll(): Promise<Goal[]> {
    return this.goalModel.find().sort({ _id: -1 }).exec();
  }

  async findOne(id: string): Promise<Goal> {
    return this.goalModel.findById(id).exec();
  }

  async update(id: string, updateGoalDto: UpdateGoalDto) {
    return this.goalModel.updateOne({ _id: id }, updateGoalDto);
  }

  async remove(id: string) {
    return this.goalModel.deleteOne({ _id: id });
  }
}
