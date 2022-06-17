import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const created = await this.productModel.create(createProductDto);
    return this.findOne(created._id);
  }

  async findOne(id: string): Promise<Product | undefined> {
    const matchProduct = await this.productModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
          pipeline: [{ $project: { _id: 1, name: 1 } }],
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'sub_category',
          foreignField: '_id',
          as: 'sub_category',
          pipeline: [{ $project: { _id: 1, name: 1 } }],
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]);
    return matchProduct[0] || undefined;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
          pipeline: [{ $project: { _id: 1, name: 1 } }],
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'sub_category',
          foreignField: '_id',
          as: 'sub_category',
          pipeline: [{ $project: { _id: 1, name: 1 } }],
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]);
  }

  async remove(id: string) {
    return this.productModel.deleteOne({ _id: id });
  }
}
