import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: '',
    },
    {
      id: 2,
      name: 'Alex Smith',
      email: '',
    },
  ];

  getAll() {
    return this.users;
  }

  getById(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  create(user: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, dto: UpdateUserDto) {
    const user = this.getById(id);

    const updatedUser = {
      ...user,
      ...dto,
    };

    this.users = this.users.map((user) =>
      user.id === id ? updatedUser : user,
    );

    return updatedUser;
  }
}
