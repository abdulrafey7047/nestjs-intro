import { Controller, Get, HttpStatus, Param, ParseIntPipe, UseGuards, UseInterceptors } from "@nestjs/common";
import { CustomParseIntPipe } from "./pipe";
import { UserGuard } from "./guard";
import { UserLoggingInterceptor } from "./interceptor";
import { JwtGuard } from "src/auth/guard";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";
import { UserService } from "./user.service";

@Controller('users')
@UseGuards(UserGuard)
@UseInterceptors(UserLoggingInterceptor)
export class UserController {

    constructor(private userService: UserService) {}

    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: User) {
        return this.userService.getMe(user);
    }

    @Get(':id')
    getId(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))
        // @Param('id', CustomParseIntPipe)
        id: number
    ) {
        return this.userService.getId(id);
    }
}
