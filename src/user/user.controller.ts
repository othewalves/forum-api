import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
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
    @UseGuards(AuthGuard)
    async getUser(
        @Param('id') id: string
    ): Promise<UserModel> {
        return this.userService.getUser({ id: Number(id) })
    }
    
    @Put(':id')
    @UseGuards(AuthGuard)
    async updateUser(
        @Param('id') id: string,
        @Body() userData: Prisma.UserUpdateInput
    ): Promise<UserModel> {
        return this.userService.updateUser(
            { data: userData, where: { id: Number(id) } }
        )
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteUser(
        @Param('id') id: string
    ): Promise<UserModel> {
        return this.userService.deleteUser({ id: Number(id) })
    }

}
