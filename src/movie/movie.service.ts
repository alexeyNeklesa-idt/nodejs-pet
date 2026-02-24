import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MovieService {
	constructor(private readonly userService: UserService) {}

	getAll() {
		const users = this.userService.getAll();
		console.log(users);
		return users;
	}
}
