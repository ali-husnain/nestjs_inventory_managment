import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getString(): string {
    return 'Server running...';
  }
}
