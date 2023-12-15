import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import { HttpExceptionFilter } from './shared/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/exceptions/all-exception.filter';

declare const module:any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('SERVER_PORT');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('v1.0');
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('TABS API')
    .setDescription('List ofavailable endpoints and usage for TABS API')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/v1.0/api', app, document)
  await app.listen(port, () => {
    console.log('[WEB]', `http://localhost:${port}`);
  });
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
