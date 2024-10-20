import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class UserService {

    getMe(user: User) {
        return user;
    }

    getId(id: number) {
        return "the type of 'id' is: " + typeof(id);
    }
}
