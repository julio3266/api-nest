import { IsNotEmpty } from 'class-validator';

export class updateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  address: string;
}
