import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateFolderDto {
  @IsString()
  folder: string;

  order: number;
}
