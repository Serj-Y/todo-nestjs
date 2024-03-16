"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountActivationModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const config_1 = require("@nestjs/config");
const account_activation_controller_1 = require("./account-activation.controller");
const account_activation_service_1 = require("./account-activation.service");
const user_model_1 = require("../user/user.model");
let AccountActivationModule = class AccountActivationModule {
};
AccountActivationModule = __decorate([
    (0, common_1.Module)({
        controllers: [account_activation_controller_1.AccountActivationController],
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: user_model_1.UserModel,
                    schemaOptions: {
                        collection: 'User',
                    },
                },
            ]),
            config_1.ConfigModule,
        ],
        providers: [account_activation_service_1.AccountActivationService],
    })
], AccountActivationModule);
exports.AccountActivationModule = AccountActivationModule;
//# sourceMappingURL=account-activation.module.js.map