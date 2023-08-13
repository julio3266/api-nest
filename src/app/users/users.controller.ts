import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly UserService: UsersService) {}
  @Get()
  async index() {
    return this.UserService.findAll;
  }
  @Post()
  async store(@Body() body: createUserDto) {
    return this.UserService.store(body);
  }
  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.UserService.findOne(id);
  }
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: updateUserDto,
  ) {
    return await this.UserService.update(id, body);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.UserService.destroy(id);
  }
}
