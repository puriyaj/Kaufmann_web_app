import { ACTIVATION_STATUS } from '../prisma/generated/client';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, MinLength } from 'class-validator';

export class CreateTicket {
  @IsNotEmpty()
  subject!: string;

  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsOptional()
  phoneNumber?: string;

  @IsNotEmpty()
  message!: string;
}
export class UpdateTicket extends CreateTicket {
  @IsNotEmpty()
  id!: string;
}

export class DeleteTicket {
  @IsNotEmpty()
  id!: string;
}

export class UpdateTicketStatus {
  @IsNotEmpty()
  id!: string;

  @IsEnum(ACTIVATION_STATUS)
  status!: ACTIVATION_STATUS;
}
