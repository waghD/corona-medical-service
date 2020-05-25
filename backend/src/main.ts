import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Corona Medical Service')
    .setDescription(
      'Rest API um mit der Datenbank für Corona Medical Service zu interagieren',
    )
    .setVersion('1.0')
    .addTag('Doctors')
    .addTag('Helpers')
    .addTag('Patients')
    .addTag('Cleaners')
    .addTag('Stations')
    .addTag('Shifts')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
