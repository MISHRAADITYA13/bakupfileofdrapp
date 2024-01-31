import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

//swagger function implementation :)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
  .setTitle('Hospital project')
  .setDescription('Swagger integrated for the modules')
  .setVersion('1.0')
  .addTag('Hosproject')
  .build()

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
