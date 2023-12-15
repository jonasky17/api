import { Transform, TransformFnParams } from "class-transformer";

export function TransformDate(params: TransformFnParams) {
    if(params.value){
        return new Date(params.value);
    }
    return undefined;
}