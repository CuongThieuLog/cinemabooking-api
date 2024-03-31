import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsDate,
  Length,
} from 'class-validator';
import { $Enums } from '@prisma/client';

export class UserDto {
  id: number;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsDate()
  email_verified?: Date;

  @IsEnum($Enums.Role)
  role: $Enums.Role;

  created_at: Date;

  updated_at: Date;

  constructor(
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    role: $Enums.Role,
    created_at: Date,
    updated_at: Date,
    email_verified?: Date,
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.role = role;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.email_verified = email_verified;
  }
}

export class CreateUserDto {
  @IsString({ message: 'Tên phải là chuỗi.' })
  @Length(1, 255, { message: 'Tên phải có độ dài từ 1 đến 255 ký tự.' })
  first_name: string;

  @IsString({ message: 'Họ phải là chuỗi.' })
  @Length(1, 255, { message: 'Họ phải có độ dài từ 1 đến 255 ký tự.' })
  last_name: string;

  @IsEmail({}, { message: 'Email không hợp lệ.' })
  email: string;

  email_verified?: Date;

  @IsEnum($Enums.Role, { message: 'Vai trò không hợp lệ.' })
  role: $Enums.Role;

  @IsString({ message: 'Mật khẩu phải là chuỗi.' })
  password: string;

  created_at: Date;

  updated_at: Date;

  constructor(
    first_name: string,
    last_name: string,
    email: string,
    role: $Enums.Role,
    password: string,
    created_at: Date,
    updated_at: Date,
    email_verified?: Date,
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.role = role;
    this.password = password;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.email_verified = email_verified;
  }
}

export class UpdateUserDto {
  id: number;

  @IsString({ message: 'Tên phải là chuỗi.' })
  @Length(1, 255, { message: 'Tên phải có độ dài từ 1 đến 255 ký tự.' })
  first_name: string;

  @IsString({ message: 'Họ phải là chuỗi.' })
  @Length(1, 255, { message: 'Họ phải có độ dài từ 1 đến 255 ký tự.' })
  last_name: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ.' })
  email?: string;

  email_verified?: Date;

  @IsOptional()
  @IsEnum($Enums.Role, { message: 'Vai trò không hợp lệ.' })
  role?: $Enums.Role;

  @IsDate({ message: 'Ngày cập nhật phải là định dạng ngày.' })
  updated_at: Date;

  constructor(
    id: number,
    updated_at: Date,
    first_name?: string,
    last_name?: string,
    email?: string,
    email_verified?: Date,
    role?: $Enums.Role,
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.email_verified = email_verified;
    this.role = role;
    this.updated_at = updated_at;
  }
}
