import { IsNumber, IsOptional, IsString } from "class-validator";

export class PagedRequest {
  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsNumber()
  page?: number = 1;
}
