import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { LoggingInterceptor } from './common/interceptors/logging.intercepter';
import { EntityNotFoundExceptionFilter } from './common/filters/entity-not-found-exception.filter';

async function bootstrap() {
  const sysLogger = new Logger('System', true);
  let isDisableKeepAlive = false;

  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'], //['log', 'error', 'warn', 'debug', 'verbose']
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());

  app.use((req, res, next) => {
    if (isDisableKeepAlive) {
      res.set('Connection', 'close');
    }
    next();
  });

  const options = new DocumentBuilder()
    .setTitle('Nestbnb Backend')
    .setDescription('This is Nestbnb Backend API')
    .setVersion('1.0')
    .addTag('Airbnb')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, () => {
    // Send Ready Event for Zero Downtime Deployment
    if (process.send) process.send('ready');
    sysLogger.log('Server is running');
  });

  process.on('SIGINT', () => {
    // Disable KeepAlive to disconnect the client from the old app.
    isDisableKeepAlive = true;
    // Do not receive a new request, and exit process after responding to old requests
    app.close().then(() => {
      sysLogger.error('Server closed');
      process.exit(0);
    });
  });
}
bootstrap();
