import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

type Path = string;

@Injectable()
export class FileLog {
    private readonly dir: Path;

    constructor(dir: Path) {
        this.dir = dir;
        this.createDir(this.dir);
    }

    log(message: string) {
        const date = new Date().toISOString().split('T')[0];
        const path = `${this.dir}/${date}.log`;
        fs.appendFileSync(path, `${new Date().toISOString()} ${message}\n`);
    }

    private createDir(path: Path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
    }
}