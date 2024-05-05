import { Injectable } from '@nestjs/common';
import { FileStoreTypes } from '../interfaces/types.enum';
import { PathHelper } from '../helpers/path.helper';
import * as fs from 'fs';

interface LooseObject {
    [key: string]: any
}

@Injectable()
export class FileStoreService {
    constructor(
        private readonly pathHelper: PathHelper,
    ) {}

    fileStoreTypes = FileStoreTypes;

    async createFile(type: FileStoreTypes, fileName: string, data: LooseObject) {
        const path = this.pathHelper.getFilePath(type, fileName);
        fs.writeFileSync(path, JSON.stringify(data), 'utf8');
    }

    async getFile(type: FileStoreTypes, fileName: string): Promise<LooseObject> | null {
        const path = this.pathHelper.getFilePath(type, fileName);
        if (fs.existsSync(path) === false) {
            return null;
        }
        const data = fs.readFileSync(path, 'utf8');
        return JSON.parse(data);
    }

    async updateFile(type: FileStoreTypes, fileName: string, updates: LooseObject): Promise<LooseObject> {
        const existing = await this.getFile(type, fileName);
        const updated = this.mergeUpdates(existing, updates);
        await this.createFile(type, fileName, updated);
        return updated;
    }

    async archiveFile() {
        // Delete a file
    }

    private mergeUpdates(existing: LooseObject, updates: LooseObject) {
        return { ...existing, ...updates };
    }
}