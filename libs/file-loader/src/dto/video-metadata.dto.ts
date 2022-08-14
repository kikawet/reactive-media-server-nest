import { ParsedPath } from 'path';

export class VideoMetadaDto implements ParsedPath {
  public root: string;
  public dir: string;
  public base: string;
  public ext: string;
  public name: string;
  public fullPath: string;
  public duration: number;
}
