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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const task_model_1 = require("./task.model");
let TaskService = class TaskService {
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    async create(dto) {
        const category = await new this.messageModel(Object.assign(Object.assign({}, dto), { category: dto.categoryId })).populate([
            {
                path: 'category',
                select: 'name',
            },
            {
                path: 'author',
                select: 'name',
            },
        ]);
        return category.save();
    }
    async delete(dto) {
        const response = await this.messageModel.findOneAndDelete({
            author: dto.author,
            _id: dto.taskId,
        });
        if (!response) {
            throw new common_1.NotFoundException(`Task not found`);
        }
        return response;
    }
    async update(dto) {
        const response = await this.messageModel
            .findOneAndUpdate({
            author: dto.author,
            _id: dto.taskId,
        }, { name: dto.name, status: dto.status }, { new: true })
            .populate([{ path: 'author', select: '_id name isAdmin isBanned' }]);
        if (!response) {
            throw new common_1.NotFoundException(`Task not found`);
        }
        return response;
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(task_model_1.TaskModel)),
    __metadata("design:paramtypes", [Object])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map