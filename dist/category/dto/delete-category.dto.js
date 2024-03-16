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
exports.DeleteCategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class DeleteCategoryDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)({ message: 'Category ID must be a valid MongoDB ObjectId' }),
    (0, swagger_1.ApiProperty)({
        description: 'The unique identifier of the category to be deleted',
        example: '507f1f77bcf86cd799439011',
        type: 'string',
    }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DeleteCategoryDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)({ message: 'Author must be a valid MongoDB ObjectId' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DeleteCategoryDto.prototype, "author", void 0);
exports.DeleteCategoryDto = DeleteCategoryDto;
//# sourceMappingURL=delete-category.dto.js.map