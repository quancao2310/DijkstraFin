import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Goal } from "./schema/goal.schema";
import { CreateGoalDto } from "./dto/create-goal.dto";
import { UpdateGoalDto } from "./dto/update-goal.dto";

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
    try {
      const goal = await this.goalModel.findById(id).exec();

      if (!goal) {
        throw new Error();
      }

      return goal;
    } catch (err) {
      throw new NotFoundException({ message: `No goal with id: ${id}.` });
    }
  }

  async update(id: string, updateGoalDto: UpdateGoalDto): Promise<Goal> {
    try {
      const goal = await this.goalModel
        .findByIdAndUpdate(id, updateGoalDto, { new: true })
        .exec();

      if (!goal) {
        throw new Error();
      }

      return goal;
    } catch (err) {
      throw new NotFoundException({ message: `No goal with id: ${id}.` });
    }
  }

  async remove(id: string): Promise<Goal> {
    try {
      const goal = await this.goalModel.findByIdAndDelete(id).exec();

      if (!goal) {
        throw new Error();
      }

      return goal;
    } catch (err) {
      throw new NotFoundException({ message: `No goal with id: ${id}.` });
    }
  }
}
