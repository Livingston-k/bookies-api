import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class CreateAuthorDTO {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @IsOptional()
    @IsString()
    @MaxLength(200)
    bio: string
}

export class UpdateAuthorDTO {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    @MaxLength(200)
    bio: string
}