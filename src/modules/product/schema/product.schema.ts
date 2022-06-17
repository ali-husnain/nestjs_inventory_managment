import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/modules/category/schema/category.schema';

export type ProductDocument = Product & Document;
@Schema()
export class Product {
  _id: string;

  @Prop({ type: String })
  sku: string;

  @Prop({ type: Number, required: true })
  type: number;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  })
  category: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  })
  sub_category: Category;

  @Prop({ type: Object })
  shipping: object;

  @Prop({ type: Object })
  pricing: object;

  @Prop({ type: Object })
  details: object;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
