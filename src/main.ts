import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

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

  await app.listen(PORT)
  console.log("ishlab turipti ", PORT);
  
}
bootstrap(); 



