import {
  IsNotEmpty,
  IsNumber,
  isNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  adminId: string;
}
