import { IsBoolean, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  public title: string;

  @IsUrl({
    require_tld: false, // Allow localhost
    protocols: ['https'],
  })
  public url: string;

  @IsBoolean()
  @IsOptional()
  public isPrivate?: boolean;
}
