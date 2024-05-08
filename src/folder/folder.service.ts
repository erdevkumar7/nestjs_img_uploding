import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFolderDto } from './dto/createfolder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Img, ImgDocument } from './schema/image.schema';
import { NewFolder, NewFolderDocument } from './schema/newfolder.schema';

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Img.name) private ImgModel: Model<ImgDocument>,
    @InjectModel(NewFolder.name)
    private newfolderModel: Model<NewFolderDocument>,
  ) {}

  async createNewFolder(createFolderDto: CreateFolderDto) {
    const newFolder = await new this.newfolderModel(createFolderDto);
    return newFolder.save();
  }

  //todo: Get All Folders
  async getAllFolders() {
    const getAllFoldersData = await this.newfolderModel
      .find()
      .sort({ createdAt: -1 })
      .exec();
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

  //todo: update image for folder
  async updateImage(imgId: string, data: any) {
    const updatedImage = await this.ImgModel.findByIdAndUpdate(imgId, data, {
      new: true,
    });
    if (!updatedImage) {
      throw new NotFoundException(`updatedImage not Updated`);
    }
    return updatedImage.save();
  }

  //todo: Delete image
  async deleteImage(imgId: string) {
    const delelteImage = await this.ImgModel.findByIdAndDelete(imgId);
    if (!delelteImage) {
      throw new NotFoundException(`Deleted Image not Updated`);
    }
    return delelteImage._id;
  }

  //todo: Update Folder for coverImg
  async updateFolder(folderId: string, data: any) {
    const folder = await this.newfolderModel.findByIdAndUpdate(folderId, data, {
      new: true,
    });
    if (!folder) {
      throw new NotFoundException(`Folder not Updated`);
    }
    return folder.save();
  }

  async createNewFile(createFolderDto: any, filenameSaveToDB:any) {
    const newImg = await new this.ImgModel({...createFolderDto, img_name:filenameSaveToDB});
    if (!createFolderDto.order) {
      //   newFolder.order = await this.maxOrder();
    }
    return newImg.save();
  }

  getFolder() {
    return 'All';
  }

  //todo: getfolders images from Folder Collection
  async getFolderImg(folderId: string) {
    const findImgByFolderId = await this.ImgModel.find({
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
