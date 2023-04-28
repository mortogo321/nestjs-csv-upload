import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { storage } from './config/storage.config';

@Module({
  imports: [MulterModule.register({ storage: storage })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
