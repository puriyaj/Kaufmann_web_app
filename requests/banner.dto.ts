import { ACTIVATION_STATUS, BANNER_POSITION } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class CreateBanner {
  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  link!: string;

  @IsNotEmpty()
  image!: string;

  @IsOptional()
  @IsEnum(ACTIVATION_STATUS)
  status?: ACTIVATION_STATUS;

  @IsNotEmpty()
  @IsEnum(BANNER_POSITION)
  position!: BANNER_POSITION;
}
export class UpdateBanner extends CreateBanner {
  @IsNotEmpty()
  id!: string;
}

export class DeleteBanner {
  @IsNotEmpty()
  id!: string;
}
