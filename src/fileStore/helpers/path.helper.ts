import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class PathHelper {
    private readonly rootPath = path.join(__dirname, '../../../fileStore');

    getFilePath(dir: string, fileName: string): string {
        return path.join(this.getDirectoryPath(dir), fileName);
    }

    getDirectoryPath(dir: string): string {
        return path.join(this.rootPath, dir);
    }
}