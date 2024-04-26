import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Render,
  Req,
  Request,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateFolderDto } from './dto/createfolder.dto';
import { CreateNewFolderDto } from './dto/createnewfolder.dto';

@Controller('/folder')
export class FolderControler {
  constructor(private readonly folderService: FolderService) {}

  //todo: get All folders
  @Get()
  @Render('pages/getfolder.hbs')
  async getCreatedAllFolder(@Res() response, @Request() req) {
    const getAllFolders = await this.folderService.getAllFolders();
    return {
      getAllFolders,
    };
  }
  //todo: Get Folder by ObjId
  @Get('/:id')
  @Render('pages/index.hbs')
  async getFolderById(@Res() response: any, @Param('id') FolderId: string) {
    const folderById = await this.folderService.getFolderByObjId(FolderId);
    const folderImg = await this.folderService.getFolderImg(FolderId);
    return {
      folderById,
      folderImg,
    };
  }
   //todo: Update Folder for cover img
   @Put('/:id')
   async updateFolderById(    @Request() req,
   @Res() response: any,
   @Param('id') FolderId: string,
   @Body() data: any,) {
     const folderUpdate = await this.folderService.updateFolder(FolderId, data);
     return {
      folderUpdate,
     };
   }

  //todo: Image uploads
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads/folder',
        filename: (req, file, callback) => {
          const filename = `${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createFile(
    @Request() req,
    @Res() response: any,
    @Body() createFolderDto: CreateFolderDto,
  ) {
    try {
      const folder = await this.folderService.createNewFile(createFolderDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'file has been created successfully',
        folder,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error:folder not created!',
        error: 'Bad Request',
      });
    }
  }

  

  // @Get('/create')
  // @Render('pages/createfolder.hbs')
  // async getForCreateFolder(@Res() res) {
  //   // const createNew = await this.folderService.createNewFolder();
  // }

  // @Post('/create')
  // async createNewFolder(
  //   @Request() req,
  //   @Res() response: any,
  //   @Body() createNewFolderDto: CreateNewFolderDto,
  // ) {
  //   try {
  //     console.log(createNewFolderDto);
  //     const folder =
  //       await this.folderService.createNewFolder(createNewFolderDto);
  //     return response.status(HttpStatus.CREATED).json({
  //       message: 'folder has been created successfully',
  //       folder,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     return response.status(HttpStatus.BAD_REQUEST).json({
  //       statusCode: 400,
  //       message: 'Error:folder not created!',
  //       error: 'Bad Request',
  //     });
  //   }
  // }

  // @Get()
  // @Render('pages/index')
  // async getFolder(@Res() res) {
  //   const getAllFolders = await this.folderService.getFolder();
  //   return { getAllFolders };
  // }
}
