import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from 'src/database/prisma.service';



@Injectable()
export class UserService {

    @Inject()
    private readonly prisma: PrismaService

    async createUser(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data })
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput
    }): Promise<User> {
        const { where, data } = params;

        return this.prisma.user.update({
            data,
            where
        })
    }

}
