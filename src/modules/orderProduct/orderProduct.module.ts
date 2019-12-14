import { Module } from '@nestjs/common';
import { OrderProductResolver } from './oderProduct.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from './orderProduct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProduct])],
  providers: [OrderProductResolver],
})
export class OrderProductModule {}