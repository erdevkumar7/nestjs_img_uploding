import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateNewFolderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  folder: string;

  order: number;
}