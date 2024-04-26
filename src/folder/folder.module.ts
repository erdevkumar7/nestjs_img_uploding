import { Module } from '@nestjs/common';
import { FolderControler } from './folder.controller';
import { FolderService } from './folder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NewFolder, NewFolderSchema } from './schema/newfolder.schema';
import { Img, ImgSchema } from './schema/image.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
          {
            name: Img.name,
            schema: ImgSchema,
          },
        ]),
        MongooseModule.forFeature([
            {
              name: NewFolder.name,
              schema: NewFolderSchema,
            },
          ]),
      ],
    controllers: [FolderControler],
    providers: [FolderService],
    exports: [FolderService]
})
export class FolderModule {}
