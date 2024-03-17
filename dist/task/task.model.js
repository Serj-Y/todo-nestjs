"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const swagger_1 = require("@nestjs/swagger");
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const mongoose_1 = require("mongoose");
const task_status_1 = require("./..//shared/consts/task-status");
const todo_model_1 = require("./../todo/todo.model");
const user_model_1 = require("./../user/user.model");
let TaskModel = class TaskModel extends defaultClasses_1.TimeStamps {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '65f73d3ec53f4aa7e8939696',
        description: 'Unique identifier for the Task',
    }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], TaskModel.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'My work', description: 'Display task name' }),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], TaskModel.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the task',
        enum: task_status_1.StatusType,
        default: task_status_1.StatusType.PENDING,
    }),
    (0, typegoose_1.prop)({ required: true, enum: task_status_1.StatusType, default: task_status_1.StatusType.PENDING }),
    __metadata("design:type", String)
], TaskModel.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => user_model_1.UserModel }),
    __metadata("design:type", Object)
], TaskModel.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Order of the task within its Todo' }),
    (0, typegoose_1.prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], TaskModel.prototype, "order", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => todo_model_1.TodoModel }),
    __metadata("design:type", Object)
], TaskModel.prototype, "todo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp of when the task was created',
        type: Date,
    }),
    __metadata("design:type", Date)
], TaskModel.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp of the last update to the task',
        type: Date,
    }),
    __metadata("design:type", Date)
], TaskModel.prototype, "updatedAt", void 0);
TaskModel = __decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { versionKey: false } })
], TaskModel);
exports.TaskModel = TaskModel;
//# sourceMappingURL=task.model.js.map