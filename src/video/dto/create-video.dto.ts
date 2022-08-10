import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  public title: string;

  @IsUrl({
    require_tld: false, // Allow localhost
    protocols: ['https'],
  })
  public url: string;
}
