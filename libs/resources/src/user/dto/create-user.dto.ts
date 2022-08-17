import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  public login: string;
  @IsNotEmpty()
  public password: string;
}
