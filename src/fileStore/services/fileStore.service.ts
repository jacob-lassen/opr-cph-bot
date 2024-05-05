import { Injectable } from '@nestjs/common';
import { FileStoreTypes } from '../interfaces/types.enum';
import { PathHelper } from '../helpers/path.helper';
import * as fs from 'fs';

@Injectable()
export class FileStoreService {
    constructor(
        private readonly pathHelper: PathHelper,
    ) {}

    fileStoreTypes = FileStoreTypes;

    async createFile(type: FileStoreTypes, fileName: string, data: string) {
        const path = this.pathHelper.getFilePath(type, fileName);
        fs.writeFileSync(path, data, 'utf8');
    }

    async updateFile() {
        // Update a file
    }

    async archiveFile() {
        // Delete a file
    }
}