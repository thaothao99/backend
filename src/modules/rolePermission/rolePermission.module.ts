import { Module } from '@nestjs/common';
import { RolePermissionResolver } from './rolePermission.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  } from './rolePermission.entity';
import { RolePermission } from './rolePermission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission])],
  providers: [RolePermissionResolver],
})
export class RolePermissionModule {}