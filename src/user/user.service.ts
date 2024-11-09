import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from 'src/database/prisma.service';

import * as bcrypt from 'bcrypt';




@Injectable()
export class UserService {

    @Inject()
    private readonly prisma: PrismaService

    async createUser(data: Prisma.UserCreateInput) {
        
        const hashPassword = await bcrypt.hash(data.password, 10);

        return this.prisma.user.create({ data:{...data, password: hashPassword} })
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
