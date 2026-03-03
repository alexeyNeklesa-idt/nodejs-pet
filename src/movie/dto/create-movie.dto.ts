import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMovieDto {
	@IsNotEmpty()
	@IsString()
	title: string;
	@IsNotEmpty()
	@Transform(({ value }) => new Date(value))
	@IsDate()
	releaseDate: Date;
}
