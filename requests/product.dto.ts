import { ACTIVATION_STATUS } from '../prisma/generated/client';
import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateProduct {
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(ACTIVATION_STATUS)
  status?: ACTIVATION_STATUS;

  // @IsOptional()
  // features?: JSON;

  @IsBoolean()
  @IsOptional()
  isMain?: boolean;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean | null;

  @IsArray()
  @ArrayMinSize(1)
  images!: string[];

  @IsOptional()
  tags?: string;

  @IsNotEmpty()
  subCategoryId!: string;
}
export class UpdateProduct extends CreateProduct {
  @IsNotEmpty()
  id!: string;
}

export class DeleteProduct {
  @IsNotEmpty()
  id!: string;
}
