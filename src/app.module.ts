import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/n17'),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    AdminModule,
    FileModule,
    UserModule,
  ],
})
export class AppModule {}
