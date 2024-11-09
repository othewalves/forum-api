import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('signup')
    async signupUser(
        @Body() userData: Prisma.UserCreateInput,
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }

    @Get(':id')
    async getUser(
        @Param('id') id: string
    ): Promise<UserModel> {
        return this.userService.getUser({ id: Number(id) })
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() userData: Prisma.UserUpdateInput
    ): Promise<UserModel> {
        return this.userService.updateUser(
            { data: userData, where: { id: Number(id) } }
        )
    }

}
