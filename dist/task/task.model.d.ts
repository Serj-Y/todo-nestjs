import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { StatusType } from './..//shared/consts/task-status';
import { TodoModel } from './../todo/todo.model';
import { UserModel } from './../user/user.model';
export interface TaskModel extends Base {
}
export declare class TaskModel extends TimeStamps {
    name: string;
    status: StatusType;
    author: Ref<UserModel>;
    order: number;
    todo: Ref<TodoModel>;
}
