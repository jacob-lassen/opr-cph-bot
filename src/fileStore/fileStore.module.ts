import { Module } from "@nestjs/common";
import { PathHelper } from "./helpers/path.helper";
import { FileStoreService } from "./services/fileStore.service";
import { InitializeFileStoreService } from "./services/initializeFileStore.service";

@Module({
    imports: [],
    controllers: [],
    providers: [
        PathHelper,
        FileStoreService,
        InitializeFileStoreService,
    ],
    exports: [
        FileStoreService,
        InitializeFileStoreService,
    ]
})
export class FileStoreModule {}