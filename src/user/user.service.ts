import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Admin } from 'src/admin/schemas/admin.schema';
import { resSuccess } from 'src/utils/succes-response';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const admin = await this.adminModel.findById(createUserDto.adminId);
    if (!admin) {
      throw new BadRequestException(`ID:${createUserDto.adminId} not found`);
    }
    const user = new this.userModel(createUserDto);
    await user.save();
    return resSuccess(user);
  }

  async findAll() {
    const users = await this.userModel.find().populate('adminId');
    return resSuccess(users);
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).populate('adminId');
    if (!user) {
      throw new NotFoundException(`ID:${id} not found User`);
    }
    return resSuccess(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException(`ID:${id} not found User`);
    }
    return resSuccess(user);
  }

  async remove(id: string) {
    const deleted = await this.userModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`ID:${id} not found User`);
    }
    return resSuccess({});
  }
}
