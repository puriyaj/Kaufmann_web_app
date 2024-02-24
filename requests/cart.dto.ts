import { Decimal } from '@prisma/client/runtime/library';
import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateCart {
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  qty!: number;

  @IsNotEmpty()
  price!: Decimal;

  @IsNotEmpty()
  productId!: string;
}
export class UpdateCart extends CreateCart {
  @IsNotEmpty()
  id!: string;
}

export class DeleteCart {
  @IsNotEmpty()
  id!: string;
}
