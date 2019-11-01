import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleResolver],
})
export class RoleModule {}