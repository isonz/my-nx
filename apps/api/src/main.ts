/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app/app.module';
import { logger } from './common/middleware/logger.middleware';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './common/exception/http.exception';
import { AllExceptionsFilter } from './common/exception/all.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  app.use(logger);    // 监听所有的请求路由，并打印日志
  app.useGlobalInterceptors(new TransformInterceptor());  // 使用拦截器打印出参
  // app.useGlobalFilters(new AllExceptionsFilter());        // 过滤处理所有未知异常
  // app.useGlobalFilters(new HttpExceptionFilter());        // 过滤处理 HTTP 异常


  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
