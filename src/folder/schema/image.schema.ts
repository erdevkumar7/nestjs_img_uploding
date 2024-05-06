import { ConfigService } from '@nestjs/config';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImgDocument = Img & Document;

@Schema({ autoIndex: true, toJSON: { virtuals: true } })
export class Img {
  @Prop()
  img_name: string;

  @Prop()
  folderId: string;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ default: Date.now }) // Default value to the current timestamp
  createdAt: string;

  @Prop({ default: Date.now }) 
  updatedAt: string;
}
const ImgSchema = SchemaFactory.createForClass(Img);


export { ImgSchema };
