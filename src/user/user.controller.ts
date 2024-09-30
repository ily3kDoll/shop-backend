import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
    }

    @Get()
    getALLUser() {
        return this.service.getAll();
    }

    @Get(':id')
    getUserById(@Param('id') _id: string) {
        return this.service.getOne(_id);
    }

}