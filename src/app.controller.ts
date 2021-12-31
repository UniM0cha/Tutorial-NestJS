import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  hello(): string {
    return 'Welcome to my Movie API';
  }
}
