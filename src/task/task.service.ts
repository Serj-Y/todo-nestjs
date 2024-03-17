import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { CreateTaskDto } from './dto/create-task.dto'
import { DeleteTaskDto } from './dto/delete-task.dto'
import { SwapOrderTaskDto } from './dto/swap-order-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TaskModel } from './task.model'

@Injectable()
export class TaskService {
	constructor(
		@InjectModel(TaskModel) private readonly taskModel: ModelType<TaskModel>
	) {}

	async create(dto: CreateTaskDto) {
		const maxOrderTask = await this.taskModel
			.findOne({ todo: dto.todoId, author: dto.author })
			.sort({ order: -1 })
			.exec()

		const order = maxOrderTask ? maxOrderTask.order + 1 : 1

		const newTask = new this.taskModel({ ...dto, todo: dto.todoId, order })
		const { author, todo, ...res } = (await newTask.save()).toJSON()

		return res
	}

	async delete(dto: DeleteTaskDto) {
		const taskToDelete = await this.taskModel.findOne({
			_id: dto.taskId,
			author: dto.author,
		})

		if (!taskToDelete) {
			throw new Error('Task not found')
		}

		const deletedOrder = taskToDelete.order
		const todoId = taskToDelete.todo
		await taskToDelete.remove()

		await this.taskModel.updateMany(
			{ todo: todoId, order: { $gt: deletedOrder } },
			{ $inc: { order: -1 } }
		)

		const { author, todo, ...res } = taskToDelete.toJSON()

		return res
	}

	async update(dto: UpdateTaskDto) {
		const { author, taskId: _id, ...rest } = dto

		const task = await this.taskModel.findOneAndUpdate(
			{ author, _id },
			{ ...rest },
			{ new: true }
		)

		if (!task) {
			throw new NotFoundException(`Task not found`)
		}

		const { author: dAuthor, todo: dTodo, ...res } = task.toJSON()

		return res
	}

	async swapTaskOrders(dto: SwapOrderTaskDto) {
		const tasks = await this.taskModel.find({
			_id: { $in: [dto.firstTaskId, dto.secondTaskId] },
			author: dto.author,
		})

		if (tasks.length !== 2) {
			throw new NotFoundException(
				'One or both tasks not found or do not belong to the specified todo'
			)
		}

		const [firstTask, secondTask] = tasks

		if (firstTask.todo.toString() !== secondTask.todo.toString()) {
			throw new NotFoundException('Mismatched tasks')
		}

		const tempOrder = firstTask.order
		firstTask.order = secondTask.order
		secondTask.order = tempOrder

		await firstTask.save()
		await secondTask.save()

		return [secondTask, firstTask]
	}
}
