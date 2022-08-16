import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUrl,
} from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  public title: string;

  @IsUrl({
    require_tld: false, // Allow localhost
    protocols: ['https'],
  })
  public url: string;

  @IsNumber()
  @IsPositive()
  /** Duration in seconds */
  public duration: number;

  @IsBoolean()
  @IsOptional()
  public isPrivate?: boolean;
}
