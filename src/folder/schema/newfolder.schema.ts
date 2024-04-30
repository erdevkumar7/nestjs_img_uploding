import { ConfigService } from '@nestjs/config';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewFolderDocument = NewFolder & Document;

@Schema({ autoIndex: true, toJSON: { virtuals: true } })
export class NewFolder {
  @Prop()
  name: string;

  @Prop()
  cover_img: string;

  @Prop({ type: [String], default: [] })
  imageOrder: string[]; 

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ default: Date.now }) // Default value to the current timestamp
  createdAt: string;
}
const NewFolderSchema = SchemaFactory.createForClass(NewFolder);


export { NewFolderSchema };