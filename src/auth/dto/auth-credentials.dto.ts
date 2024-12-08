import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @ApiProperty({ description: 'Username of the user' })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @ApiProperty({ description: 'Password of the user' })
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message : "password is too weak"})
    password: string;
}