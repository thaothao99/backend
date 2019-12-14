import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductResolver],
})
export class ProductModule {}