import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ListModule } from './modules/list/list.modules';

@Module({
  imports: [AuthModule, ListModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
