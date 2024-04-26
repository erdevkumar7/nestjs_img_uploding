import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  folder: string;

  @IsString()
  @IsNotEmpty()
  img_name: string;

  @IsString()
  image: string;

  @IsString()
  folderId: string;

  order: number;

  @Transform(({ value }) => new Date(value))
  createdAt: Date;
}

