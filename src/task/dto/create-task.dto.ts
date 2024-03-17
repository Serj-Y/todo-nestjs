import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsEnum,
	IsMongoId,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator'
import { Types } from 'mongoose'
import { StatusType } from './../../shared/consts/task-status'

export class CreateTaskDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(120)
	@ApiProperty({
		description: 'The name of the task',
		maxLength: 120,
		example: 'Implement new feature',
	})
	name: string

	@IsNotEmpty()
	@IsMongoId({ message: 'todo_id must be a valid MongoDB ObjectId' })
	@ApiProperty({
		description: 'The MongoDB ObjectId of the todo this task belongs to',
		example: '507f191e810c19729de860ea',
		type: 'string',
	})
	todoId: string

	@IsEnum(StatusType)
	@IsOptional()
	@ApiPropertyOptional({
		description: 'The status of the todo',
		enum: StatusType,
		example: StatusType.PENDING,
	})
	status: StatusType

	@IsNotEmpty()
	@IsMongoId({ message: 'author must be a valid MongoDB ObjectId' })
	author: Types.ObjectId
}
