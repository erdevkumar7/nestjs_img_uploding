import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

export const ExtractImageFromRequest = createParamDecorator((data:string, ctx:ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest<Request>();
    const imageFile = request.body;

    if(!imageFile) {
        throw new Error('Image file not found')
    }
    
    return imageFile;
});
