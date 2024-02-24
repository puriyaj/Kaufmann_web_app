import { CURRENCY_TYPE } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, MinLength } from "class-validator";

export class CreateStock {
  @IsNotEmpty()
  price!: Decimal;

  @IsNotEmpty()
  @IsNumber()
  inStock!: number;

  @IsNotEmpty()
  @IsNumber()
  discount!: number;

  @IsNotEmpty()
  @IsEnum(CURRENCY_TYPE)
  currency!: CURRENCY_TYPE;

  @IsNotEmpty()
  productId!: string;
}
export class UpdateStock extends CreateStock {
  @IsNotEmpty()
  id!: string;
}

export class DeleteStock {
  @IsNotEmpty()
  id!: string;
}
