import { Injectable } from '@nestjs/common';
import { MovieEntity } from './entiries/movie.entity';
import { Repository } from 'typeorm/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MovieService {
	constructor(
		@InjectRepository(MovieEntity)
		private readonly movieRepository: Repository<MovieEntity>,
	) {}

	async getAll(): Promise<MovieEntity[]> {
		return await this.movieRepository.find();
	}

	async create(dto: CreateMovieDto): Promise<MovieEntity> {
		const newMovie = this.movieRepository.create(dto);
		return await this.movieRepository.save(newMovie);
	}
}
