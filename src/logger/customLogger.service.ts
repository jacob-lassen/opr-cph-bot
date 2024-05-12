import { ConsoleLogger, Injectable } from '@nestjs/common';
import { FileLog } from './fileLog';
import * as path from 'path';

const logPath = path.join(__dirname, '../../logs')

@Injectable()
export class CustomLogger extends ConsoleLogger {
    private readonly FileLog: FileLog;
    constructor() {
        super();
        this.FileLog = new FileLog(logPath);
    }
    error(message: string, trace: string) {
        super.error(message, trace);
        this.FileLog.log(`ERROR: ${message} ${trace}`);
    }
}