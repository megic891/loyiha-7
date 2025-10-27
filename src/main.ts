import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filter/all-exeption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000;
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  })
  )
  app.enableCors()
  app.use(helmet())
  app.useGlobalFilters(new HttpExceptionFilter)
   // Swagger sozlamalari
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('User, Auth va Product API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // Bu nom guardlarda ishlatiladi
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Token saqlab qolish
    },
  });

  
  await app.listen(PORT, () =>{
   console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`)
  }
  )
  
}
bootstrap(); 



