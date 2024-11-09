import { Prisma, User } from '@prisma/client';
import { UserService } from './../user/user.service';
import { Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';

import * as bcrypt from 'bcrypt';
export class AuthService {

    @Inject()
    private readonly userService: UserService

    async signin(
        email: string,
        pass: string
    ): Promise<Omit<User, 'password'>> {
        const user = await this.userService.getUser({ email })

        if (!user) throw new NotFoundException('Usuário inválido')

        const passwordMatch = await bcrypt.compare(pass, user.password);

        if (!passwordMatch) throw new UnauthorizedException('E-mail e/ou senha inválidos')

        const { password, ...result } = user

        return result

    }
}
