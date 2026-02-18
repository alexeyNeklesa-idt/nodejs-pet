import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private readonly users = [
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

  create(user: UserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };

    this.users.push(newUser);

    return newUser;
  }
}
