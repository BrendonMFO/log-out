import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from './api-config.service';
import { validationSchema } from './api-config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
    }),
  ],
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
export class ApiConfigModule {}
