import { IsBoolean, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateSubCategory {
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsOptional()
  isMain?: boolean;

  @IsNotEmpty()
  categoryId!: string;
}
export class UpdateSubCategory extends CreateSubCategory {
  @IsNotEmpty()
  id!: string;
}

export class DeleteSubCategory {
  @IsNotEmpty()
  id!: string;
}
