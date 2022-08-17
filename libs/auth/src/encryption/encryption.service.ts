import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as encryptor from 'bcrypt';

@Injectable()
export class EncryptionService {
  private readonly saltOrRounds: number;
  constructor(private readonly config: ConfigService) {
    this.saltOrRounds = this.config.get('HASH_SALTROUNDS') ?? 15;
  }

  hash(word: string): Promise<string> {
    return encryptor.hash(word, this.saltOrRounds);
  }

  compare(word: string, hash: string): Promise<boolean> {
    return encryptor.compare(word, hash);
  }
}
