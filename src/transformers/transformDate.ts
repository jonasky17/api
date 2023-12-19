import { Transform, TransformFnParams } from "class-transformer";

export function TransformDate(params: TransformFnParams) {
    if (params.value) {
        const d = new Date(params.value);
        var month = d.getMonth() + 1; // Months are zero-based, so we add 1
        var day = d.getDate();
        var year = d.getFullYear();
        var formattedDate = month + '-' + day + '-' + year;

        return d;
    }
    return undefined;
}