import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieEntity } from './entiries/movie.entity';
import { Repository } from 'typeorm/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
	constructor(
		@InjectRepository(MovieEntity)
		private readonly movieRepository: Repository<MovieEntity>,
	) {}

	async getAll(): Promise<MovieEntity[]> {
		return await this.movieRepository.find({
			order: {
				createdAt: 'DESC',
			},
		});
	}

	async getById(id: number): Promise<MovieEntity> {
		const movie = await this.movieRepository.findOneBy({ id });

		if (!movie) {
			throw new NotFoundException(`Movie with id ${id} not found`);
		}
		return movie;
	}

	async create(dto: CreateMovieDto): Promise<MovieEntity> {
		const newMovie = this.movieRepository.create(dto);
		return await this.movieRepository.save(newMovie);
	}

	async update(id: number, dto: UpdateMovieDto): Promise<MovieEntity> {
		const movie = await this.getById(id);
		const newMovie = this.movieRepository.merge(movie, dto);
		return await this.movieRepository.save(newMovie);
	}

	async delete(id: number): Promise<void> {
		const movie = await this.getById(id);
		await this.movieRepository.remove(movie);
	}
}
