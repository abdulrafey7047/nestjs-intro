import { Controller, Get, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";
import { CustomParseIntPipe } from "./custom.pipe";

@Controller('users')
export class UserController {

    @Get('me')
    getMe() {
        return 'me'
    }

    @Get(':id')
    async findOne(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))
        // @Param('id', CustomParseIntPipe)
        id: number
    ) {
        return "the type of 'id' is: " + typeof(id)
    }
}
