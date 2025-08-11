import {
  Injectable,
  InternalServerErrorException,
  Module,
} from '@nestjs/common';
import { existsSync, mkdirSync, writeFile } from 'fs';
import { join, resolve } from 'path';
import { v4 } from 'uuid';

@Injectable()
export class FileService {
  async createFile(file: Express.Multer.File) {
    try {
      const fileName = `${v4()}_${file.originalname}`;
      const filePath = resolve(__dirname, '..', '..', 'uploads');
      if (!existsSync(filePath)) {
        mkdirSync(filePath, { recursive: true });
      }

      await new Promise<void>((resolve, rejects) => {
        writeFile(join(filePath, fileName), file.buffer, (error) => {
          if (error) rejects(error);
          resolve();
        });
      });

      return fileName;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error on uploding file: ${error}`,
      );
    }
  }
}
