import { ACTIVATION_STATUS } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, MinLength } from 'class-validator';

export class CreateComment {
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  email?: string;

  @IsNotEmpty()
  message!: string;

  @IsNumber()
  @IsOptional()
  stars?: number;

  @IsNotEmpty()
  productId!: string;
}
export class UpdateComment extends CreateComment {
  @IsNotEmpty()
  id!: string;
}

export class DeleteComment {
  @IsNotEmpty()
  id!: string;
}

export class UpdateCommentStatus {
  @IsNotEmpty()
  id!: string;

  @IsEnum(ACTIVATION_STATUS)
  status!: ACTIVATION_STATUS;
}
