import { Module } from '@nestjs/common';
import { BillServiceResolver } from './billService.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillService } from './billService.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillService])],
  providers: [BillServiceResolver],
})
export class BillServicetModule {}