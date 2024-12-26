import { IsEmail, IsEmpty, IsEnum, IsNotEmpty } from 'class-validator';

enum Gender {
  Male = 'male',
  Female = 'female',
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsEmpty()
  image: string;
}
