import { Module } from '@nestjs/common';
import { BillProductResolver } from './billProduct.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillProduct } from './billProduct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillProduct])],
  providers: [BillProductResolver],
})
export class BillProductModule {}