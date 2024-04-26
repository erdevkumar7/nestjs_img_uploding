import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFolderDto } from './dto/createfolder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Folder, FolderDocument } from './schema/folder.schema';
import { NewFolder } from './schema/newfolder.schema';

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<FolderDocument>,
    @InjectModel(NewFolder.name) private newfolderModel: Model<FolderDocument>,
  ) {}

  async createNewFolder(createFolderDto: CreateFolderDto) {
    const newFolder = await new this.newfolderModel(createFolderDto);
    return newFolder.save();
  }

  //todo: Get All Folders
  async getAllFolders() {
    const getAllFoldersData = await this.newfolderModel.find();
    if (!getAllFoldersData) {
      throw new NotFoundException(`Folders are not found`);
    }
    return getAllFoldersData;
  }

  //todo: Get Folder
  async getFolderByObjId(folderId: string) {
    const folderkById = await this.newfolderModel.findById(folderId);
    if (!folderkById) {
      throw new NotFoundException(`Folder #${folderId} not found`);
    }
    return folderkById;
  }

  //todo: Update Folder for coverImg
  async updateFolder(folderId: string, data: any) {
    const folder = await this.newfolderModel.findByIdAndUpdate(folderId, data, { new: true });
    if (!folder) {
      throw new NotFoundException(`Folder not Updated`);
    }
    return folder.save();
  }


  async createNewFile(createFolderDto: CreateFolderDto) {
    const newFolder = await new this.folderModel(createFolderDto);
    if (!createFolderDto.order) {
      //   newFolder.order = await this.maxOrder();
    }
    return newFolder.save();
  }

  getFolder() {
    return 'All';
  }

  //todo: getfolders images from Folder Collection
  async getFolderImg(folderId: string) {
    const findImgByFolderId = await this.folderModel
      .find({
        folderId: folderId,
      })
      .sort({ createdAt: -1 })
      .exec();
    if (!findImgByFolderId) {
      throw new NotFoundException(`Images are not found`);
    }
    return findImgByFolderId;
  }
}
