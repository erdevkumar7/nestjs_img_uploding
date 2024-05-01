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
import { ExtractImageFromRequest } from 'src/decorators/image.decorator';

@Controller('/folder')
export class FolderControler {
  constructor(private readonly folderService: FolderService) {}

  //todo: get All folders
  @Get()
  @Render('pages/folders.hbs')
  async getCreatedAllFolder(@Res() response, @Request() req) {
    const getAllFolders = await this.folderService.getAllFolders();
    return {
      getAllFolders,
    };
  }
  //todo: Get Folder by ObjId
  @Get('/:id')
  @Render('pages/images.hbs')
  async getFolderById(@Res() response: any, @Param('id') FolderId: string) {
    const folderById = await this.folderService.getFolderByObjId(FolderId);
    const folderImg = await this.folderService.getFolderImg(FolderId);
    const getAllFolders = await this.folderService.getAllFolders();
    return {
      folderById,
      folderImg,
      getAllFolders
    };
  }

  //todo: Update image for Folder
  @Put('/:id')
  async updateImage(    @Request() req,
  @Res() response: any,
  @Param('id') imgId: string,
  @Body() data: any,) {
    const folderUpdate = await this.folderService.updateImage(imgId, data);
    response.json(folderUpdate)
   //  return {
   //   folderUpdate,
   //  };
  }


   //todo: Update Folder for cover img
   @Put('/update/:id')
   async updateFolderById(    @Request() req,
   @Res() response: any,
   @Param('id') FolderId: string,
   @Body() data: any,) {
     const folderUpdate = await this.folderService.updateFolder(FolderId, data);
     response.json(folderUpdate)
    //  return {
    //   folderUpdate,
    //  };
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
    @ExtractImageFromRequest() image: Express.Multer.File,
    // @Body() createFolderDto: CreateFolderDto,
  ) {
    try {
      const folder = await this.folderService.createNewFile(image);
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

  //todo: folder create
  @Post('/create')
  async createNewFolder(
    @Request() req,
    @Res() response: any,
    @Body() createNewFolderDto: any,
  ) {
    try {
      console.log(createNewFolderDto);
      const folder =
        await this.folderService.createNewFolder(createNewFolderDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'folder has been created successfully',
        folder,
      });
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error:folder not created!',
        error: 'Bad Request',
      });
    }
  }

}
