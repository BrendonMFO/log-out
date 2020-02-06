import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApiConfigService } from './modules/api-config/api-config.service';

function bootstrapSwagger(app: NestExpressApplication) {
  const options = new DocumentBuilder()
    .setTitle('Log-Out')
    .setVersion('0.0.2')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const apiConfigService = app.get(ApiConfigService);
  bootstrapSwagger(app);
  app.connectMicroservice(apiConfigService.redisConfig);
  await app.startAllMicroservicesAsync();
  await app.listen(apiConfigService.apiConfig.port);
}

bootstrap();
