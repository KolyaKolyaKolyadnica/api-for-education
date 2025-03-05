import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CatDocument } from 'src/schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel('cats') private catModel: Model<CatDocument>) {}

  async create(createCatDto: Cat) {
    return this.catModel.create(createCatDto);
  }

  async findAll() {
    return this.catModel.find().exec();
  }

  async findOne(id: string) {
    return this.catModel.findById(id).exec();
  }

  async update(id: string, updateCatDto: Cat) {
    return this.catModel
      .findByIdAndUpdate(id, updateCatDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.catModel.deleteOne({ _id: id }).exec();
  }
}
