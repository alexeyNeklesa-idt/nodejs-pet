import { IsDate, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateMovieDto {
	@IsString()
	@IsOptional()
	title: string;
	@Transform(({ value }) => new Date(value))
	@IsDate()
	@IsOptional()
	releaseDate: Date;
}
