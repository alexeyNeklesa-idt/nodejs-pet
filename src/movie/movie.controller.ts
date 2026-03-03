import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movie')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get(':id')
	getById(@Param('id') id: string) {
		return this.movieService.getById(Number(id));
	}

	@Get()
	getAll() {
		return this.movieService.getAll();
	}

	@Post()
	create(@Body() dto: CreateMovieDto) {
		return this.movieService.create(dto);
	}

	@Post(':id')
	update(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
		return this.movieService.update(Number(id), dto);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.movieService.delete(Number(id));
	}
}
