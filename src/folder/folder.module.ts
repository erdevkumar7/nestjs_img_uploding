import { Module } from '@nestjs/common';
import { FolderControler } from './folder.controller';
import { FolderService } from './folder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from './schema/folder.schema';
import { NewFolder, NewFolderSchema } from './schema/newfolder.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
          {
            name: Folder.name,
            schema: FolderSchema,
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
