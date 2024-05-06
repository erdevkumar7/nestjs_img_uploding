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
    return JSON.parse(arrString);
  });

  hbs.registerHelper('changeUnixTime', function (times) {
    const timestamp = Number(times)
    const date = new Date(timestamp);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const monthName = monthNames[monthIndex]; 
    return `${day} ${monthName} ${year}`

  });



  await app.listen(3001);
}
bootstrap();
