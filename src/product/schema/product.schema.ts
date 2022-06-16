import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({ type: Object })
  shipping: object;

  @Prop({ type: Object })
  pricing: object;

  @Prop({ type: Object })
  details: object;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
