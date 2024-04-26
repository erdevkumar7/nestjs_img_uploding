import { ConfigService } from '@nestjs/config';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewFolderDocument = NewFolder & Document;

@Schema({ autoIndex: true, toJSON: { virtuals: true } })
export class NewFolder {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop({ default: false })
  deleted: boolean;
}
const NewFolderSchema = SchemaFactory.createForClass(NewFolder);

NewFolderSchema.virtual('iconURL').get(function () {
  const configService = new ConfigService();
  return this.image
    ? configService.get('MEDIA_URL') + '/uploads/icon/' + this.image
    : null;
});

export { NewFolderSchema };