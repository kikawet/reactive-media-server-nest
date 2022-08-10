import { Injectable } from '@nestjs/common';
import { PathLike } from 'fs';
import { readdir } from 'fs/promises';

@Injectable()
export class FileLoaderService {
  scanFolder(path: PathLike): Promise<string[]> {
    return readdir(path);
  }
}
