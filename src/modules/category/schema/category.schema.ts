import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type CategoryDocument = Category & Document;
@Schema()
export class Category {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  })
  is_parent: Category;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
