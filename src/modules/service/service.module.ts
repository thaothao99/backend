import { Module } from '@nestjs/common';
import { ServiceResolver } from './service.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  providers: [ServiceResolver],
})
export class ServiceModule {}