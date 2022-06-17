import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.create(createCategoryDto);
  }

  async findOne(id: string): Promise<Category | undefined> {
    return this.categoryModel.findById(id, { __v: 0 });
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find({}, { __v: 0 });
  }

  prepareCategoryNesting(data: any[], orginalData: any[]) {
    let clonedData = JSON.parse(JSON.stringify(data));
    const categories = [];
    clonedData.forEach((category) => {
      const category_children = orginalData.filter(
        (_d) => _d.is_parent?.toString() == category._id.toString(),
      );

      if (category_children.length > 0) {
        clonedData = clonedData.filter(
          (_d) => _d.is_parent?.toString() != category._id.toString(),
        );

        category.children = this.prepareCategoryNesting(
          category_children,
          orginalData,
        );
      }

      categories.push(category);
    });
    return categories;
  }

  prepareCategories(data: any[]) {
    let clonedData = JSON.parse(JSON.stringify(data));
    const categories = [];
    clonedData
      .filter((_data) => !_data.is_parent)
      .forEach((category) => {
        const category_children = data.filter(
          (_d) => _d.is_parent?.toString() == category._id.toString(),
        );

        if (category_children.length > 0) {
          clonedData = clonedData.filter(
            (_d) => _d.is_parent?.toString() != category._id.toString(),
          );

          category.children = this.prepareCategoryNesting(
            category_children,
            data,
          );
        }

        categories.push(category);
      });
    return categories;
  }

  async remove(id: string) {
    return this.categoryModel.deleteOne({ _id: id });
  }
}
