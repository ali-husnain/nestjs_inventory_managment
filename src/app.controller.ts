import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  async serverRunning() {
    return this.appService.getString();
  }
}
