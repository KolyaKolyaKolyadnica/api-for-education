import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const mongoUrl = configService.get('MONGO_URL');
        const mongoUser = configService.get('MONGO_USER');
        const mongoPassword = configService.get('MONGO_PASSWORD');

        return {
          uri: mongoUrl,
          authSource: 'admin',
          auth: {
            username: mongoUser,
            password: mongoPassword,
          },
        };
      },
      inject: [ConfigService],
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
