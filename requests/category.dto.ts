import { IsBoolean, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateCategory {
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsOptional()
  isMain?: boolean;
}
export class UpdateCategory extends CreateCategory {
  @IsNotEmpty()
  id!: string;
}

export class DeleteCategory {
  @IsNotEmpty()
  id!: string;
}
