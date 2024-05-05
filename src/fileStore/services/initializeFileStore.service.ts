import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { FileStoreTypes } from '../interfaces/types.enum';
import { PathHelper } from '../helpers/path.helper';

@Injectable()
export class InitializeFileStoreService {
    constructor(
        private readonly pathHelper: PathHelper,
    ) {}

    async initializeStore() {
        for (const idx in FileStoreTypes) {
            const type = FileStoreTypes[idx];
            this.createFileTypeDirectory(type);
        }
    }

    private createFileTypeDirectory(type: FileStoreTypes) {
        const typePath = this.pathHelper.getDirectoryPath(type);
        const archievePath = this.pathHelper.getDirectoryPath(`${type}/archive`);
        this.createFileDirectory(typePath)
        this.createFileDirectory(archievePath);
    }

    private createFileDirectory(path: string) {
        if (fs.existsSync(path)) {
            return;
        };
        fs.mkdirSync(path, { recursive: true });
    }
}