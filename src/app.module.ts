import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Polina:test@cluster0.ksfuq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    UserModule,
  ],

})
export class AppModule { }
