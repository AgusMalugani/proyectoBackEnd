import { Controller, Get } from "@nestjs/common";


@Controller("/auth")
export class AuthController{
    constructor(private readonly authController:AuthController){}

@Get()
getAllAuth():string{
return this.authController.getAllAuth();
}

}
