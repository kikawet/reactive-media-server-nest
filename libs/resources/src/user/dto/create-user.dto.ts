import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  public login: string;
  @IsNotEmpty()
  public password: string;
  @IsBoolean()
  @IsOptional()
  public isAdmin?: boolean;
}
