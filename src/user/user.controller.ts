import { Controller, Get, HttpStatus, Param, ParseIntPipe, UseGuards, UseInterceptors } from "@nestjs/common";
import { CustomParseIntPipe } from "./custom.pipe";
import { UserGuard } from "./user.guard";
import { UserLoggingInterceptor } from "./userLogging.interceptor";

@Controller('users')
@UseGuards(UserGuard)
@UseInterceptors(UserLoggingInterceptor)
export class UserController {

    @Get('me')
    getMe() {
        return 'me'
    }

    @Get(':id')
    findOne(
        // @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))
        @Param('id', CustomParseIntPipe)
        id: number
    ) {
        return "the type of 'id' is: " + typeof(id)
    }
}
