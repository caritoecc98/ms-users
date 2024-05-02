import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://192.168.0.107:8081',
    // cors
  });
  
  app.enableCors();
  
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist: true,
      //forbidNonWhitelisted: true,
      //transform: true,
    }),
  );

  await app.listen(3000, ()=>console.log("is running"));
}
bootstrap();