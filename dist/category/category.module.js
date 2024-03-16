"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.СategoryModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const category_controller_1 = require("./category.controller");
const category_model_1 = require("./category.model");
const category_service_1 = require("./category.service");
let СategoryModule = class СategoryModule {
};
СategoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [category_controller_1.СategoryController],
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: category_model_1.СategoryModel,
                    schemaOptions: {
                        collection: 'Сategory',
                        versionKey: false,
                    },
                },
            ]),
            config_1.ConfigModule,
        ],
        providers: [category_service_1.СategoryService],
    })
], СategoryModule);
exports.СategoryModule = СategoryModule;
//# sourceMappingURL=category.module.js.map