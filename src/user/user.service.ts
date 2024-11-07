import { Inject, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {

    @Inject()
    private readonly prisma: PrismaClient

    async createUser(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data })
    }

}
