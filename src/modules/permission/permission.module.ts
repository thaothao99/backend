import { Module } from '@nestjs/common';
import { PermissionResolver } from './permission.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionResolver],
})
export class PermissionModule {}