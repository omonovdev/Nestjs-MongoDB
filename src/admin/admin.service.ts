import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schema';
import { Model } from 'mongoose';
import { resSuccess } from 'src/utils/succes-response';
import { handleError } from 'src/utils/hande-error';
import { FileService } from 'src/file/file.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    private readonly fileService: FileService,
  ) {}
  async create(createAdminDto: CreateAdminDto, file: Express.Multer.File) {
    try {
      const existsAdmin = await this.adminModel.findOne({
        name: createAdminDto.name,
      });
      const image = await this.fileService.createFile(file);
      if (existsAdmin)
        throw new NotFoundException(
          `Admin name:${createAdminDto.name} already exists`,
        );
      const admin = new this.adminModel({ ...createAdminDto, image });
      await admin.save();
      return resSuccess(admin);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const admin = await this.adminModel.find();
      return resSuccess(admin);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const admin = await this.adminModel.findById(id);
      if (!admin) {
        throw new NotFoundException(`ID:${id} not found Admin`);
      }
      return resSuccess(admin);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      const admin = await this.adminModel.findByIdAndUpdate(
        id,
        updateAdminDto,
        { new: true },
      );
      if (!admin) {
        throw new NotFoundException(`ID:${id} not found Admin`);
      }
      return resSuccess(admin);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const admin = await this.adminModel.findByIdAndDelete(id);
      if (!admin) {
        throw new NotFoundException(`ID:${id} not found Admin`);
      }
      return resSuccess({});
    } catch (error) {
      handleError(error);
    }
  }
}
