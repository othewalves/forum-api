import { Prisma, User } from '@prisma/client';
import { UserService } from './../user/user.service';
import { Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
export class AuthService {

    @Inject()
    private readonly userService: UserService

    @Inject()
    private jwtService: JwtService


    async signin(
        email: string,
        pass: string
    ): Promise<{ access_token: string }> {
        const user = await this.userService.getUser({ email })

        if (!user) throw new NotFoundException('Usuário inválido')

        const passwordMatch = await bcrypt.compare(pass, user.password);

        if (!passwordMatch) throw new UnauthorizedException('E-mail e/ou senha inválidos')

        const { password, ...result } = user

        const payload = { sub: user.id }

        return { access_token: await this.jwtService.signAsync(payload) }

    }
}
