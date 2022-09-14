import { Module } from '@nestjs/common';
import { DatabaseModule } from '@rms/database';
import { SuggestionService } from './suggestion.service';

@Module({
  imports: [DatabaseModule],
  providers: [SuggestionService],
  exports: [SuggestionService],
})
export class SuggestionModule {}
