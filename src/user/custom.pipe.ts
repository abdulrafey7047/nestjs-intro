import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";


@Injectable()
export class CustomParseIntPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        return parseInt(value) //problem is it returns NaN on invalid input, but NaN is still a number
    }
}
