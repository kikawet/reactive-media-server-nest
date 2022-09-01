import { ViewOrigin } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxDate,
} from 'class-validator';

export class CreateViewDto {
  @IsNotEmpty()
  @IsString()
  public userLogin: string;
  @IsNotEmpty()
  @IsString()
  public videoTitle: string;
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @MaxDate(new Date(new Date().toISOString()))
  public timestamp?: Date;
  @IsPositive()
  @Max(100)
  public completionPercentage: number;
  @IsOptional()
  @IsIn(Object.values(ViewOrigin))
  public origin?: string;
}
