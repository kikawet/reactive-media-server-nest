import { Transform } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class QuerySuggestionDto {
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => parseInt(value))
  limit: number;
}
