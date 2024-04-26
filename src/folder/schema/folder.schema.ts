import { ConfigService } from '@nestjs/config';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FolderDocument = Folder & Document;

@Schema({ autoIndex: true, toJSON: { virtuals: true } })
export class Folder {
  @Prop()
  img_name: string;

  @Prop()
  folderId: string;

  @Prop()
  image: string;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ default: Date.now }) // Default value to the current timestamp
  createdAt: Date;

}
const FolderSchema = SchemaFactory.createForClass(Folder);

FolderSchema.virtual('iconURL').get(function () {
  const configService = new ConfigService();
  return this.image
    ? configService.get('MEDIA_URL') + '/uploads/icon/' + this.image
    : null;
});

export { FolderSchema };
