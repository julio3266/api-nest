import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { updateUserDto } from './dto/update-user.dto';
import { createUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }
  async findOne(userId: string) {
    try {
      await this.usersRepository.findOne({ where: { id: userId } });
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  async store(data: createUserDto) {
    const user = await this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }
  async update(id: string, data: updateUserDto) {
    const user = await this.usersRepository.findOneByOrFail({ id });
    this.usersRepository.merge(user, data);
    return this.usersRepository.save(user);
  }
  async destroy(id: string) {
    await this.usersRepository.findOne({ where: { id: id } });
    this.usersRepository.softDelete({ id });
  }
}
