import { Injectable } from '@nestjs/common';
import { Prisma as dbType, Suggestion } from '@prisma/client';
import { DatabaseService } from '@rms/database';

@Injectable()
export class SuggestionService {
  constructor(private readonly db: DatabaseService) {}

  suggestions(params: {
    skip?: number;
    take?: number;
    cursor?: dbType.SuggestionWhereUniqueInput;
    where?: dbType.SuggestionWhereInput;
    orderBy?: dbType.SuggestionOrderByWithRelationInput;
  }): Promise<Suggestion[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.db.suggestion.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
