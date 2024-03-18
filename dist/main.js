"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const requestIp = require("request-ip");
const app_module_1 = require("./app.module");
const configService = new config_1.ConfigService();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    app.use(requestIp.mw());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Todo documentation')
        .setDescription('The todo API description')
        .setVersion('1.0')
        .addTag('Todo')
        .addTag('Task')
        .addTag('Auth')
        .addTag('User')
        .addTag('Email activation')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('', app, document, {
        swaggerOptions: {
            defaultModelsExpandDepth: -1,
        },
    });
    if (configService.get('NODE_ENV') === 'development') {
        await app.listen(4221);
    }
    else {
        await app.listen(process.env.PORT, '0.0.0.0');
    }
}
bootstrap();
//# sourceMappingURL=main.js.map