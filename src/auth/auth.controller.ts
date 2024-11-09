import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }


    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async(
        @Body() credentials: Prisma.UserCreateInput
    ) {
        return this.authService.signin(
            credentials.email,
            credentials.password
        )
    }

}
