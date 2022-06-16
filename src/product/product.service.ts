import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productModel.create(createProductDto);
  }

  async findOne(id: string): Promise<Product | undefined> {
    return this.productModel.findById(id, { __v: 0 });
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find({}, { __v: 0 });
  }

  async remove(id: string) {
    return this.productModel.deleteOne({ _id: id });
  }
}
