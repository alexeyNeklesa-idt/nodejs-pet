import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'movies' })
export class MovieEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	title: string;
	@Column()
	releaseDate: Date;
	@CreateDateColumn()
	createdAt: Date;
	@CreateDateColumn()
	updatedAt: Date;
}
