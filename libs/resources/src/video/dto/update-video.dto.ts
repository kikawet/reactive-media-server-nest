import { PartialType } from '@nestjs/mapped-types';
import { IsArray } from 'class-validator';
import { CreateVideoDto } from './create-video.dto';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @IsArray()
  public allowedUsers: string[];
}
