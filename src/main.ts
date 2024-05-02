import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '../public'));
  app.setBaseViewsDir(join(__dirname, '../src/views'));
  app.setViewEngine('hbs');
  hbs.registerHelper('isCoverChecked', function (a, b, result) {
    return a == b ? result : '';
  });

    hbs.registerHelper('converString', function (arrString) {
    return JSON.parse(arrString);;
  });

  await app.listen(3001);
}
bootstrap();
