import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { CreateTaskDto } from './dto/create-task.dto'
import { DeleteTaskDto } from './dto/delete-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TaskModel } from './task.model'

@Injectable()
export class TaskService {
	constructor(
		@InjectModel(TaskModel) private readonly taskModel: ModelType<TaskModel>
	) {}

	async create(dto: CreateTaskDto) {
		const task = await new this.taskModel({
			...dto,
			todo: dto.todoId,
		}).populate([
			{
				path: 'todo',
				select: 'name',
			},
			{
				path: 'author',
				select: 'name',
			},
		])

		return task.save()
	}

	async delete(dto: DeleteTaskDto) {
		const response = await this.taskModel.findOneAndDelete({
			author: dto.author,
			_id: dto.taskId,
		})

		if (!response) {
			throw new NotFoundException(`Task not found`)
		}

		return response
	}

	async update(dto: UpdateTaskDto) {
		const { author, taskId: _id, ...rest } = dto

		const response = await this.taskModel
			.findOneAndUpdate({ author, _id }, { ...rest }, { new: true })
			.populate([
				{
					path: 'todo',
					select: 'name',
				},
				{
					path: 'author',
					select: 'name',
				},
			])

		if (!response) {
			throw new NotFoundException(`Task not found`)
		}

		return response
	}
}
