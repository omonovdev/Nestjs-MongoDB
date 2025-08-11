import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class ImageValidationPipe implements PipeTransform<any> {
  private readonly allowedExtensions = ['.jpeg', '.jpg', '.png', '.heic'];
  transform(value: any) {
    try {
      if (value) {
        const fileSize = value.size / 1024 / 1024;
        if (fileSize > 5) {
          throw new BadRequestException('File size bigger then  5 MB');
        }
        const file = value?.originalname;
        const fileExtension = extname(file).toLowerCase();
        if (!this.allowedExtensions.includes(fileExtension)) {
          throw new BadRequestException(
            'Only JPEG, JPG, PNG and HAIC formats can be uploaded',
          );
        }
        return value;
      }
    } catch (error) {
      throw new BadRequestException(`Error on image pipe:${error}`);
    }
  }
}
