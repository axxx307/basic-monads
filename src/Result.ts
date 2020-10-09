import { Some } from "./Option";

const OkType = 'Ok';
const ErrorType = 'Error';

class _Result<T, E> {
    private readonly _value: T;
    private readonly _internalType: string;

    constructor(value: T, internalType: string) {
        this._value = value;
        this._internalType = internalType;
    }
}

export type Result<T, E> = _Result<T, E>;
export function Ok<T, E> (value: T): Result<T, E> {
    return new _Result<T, E>(value, OkType);
}

export function Err<T, E> (error: T): Result<T, E> {
    return new _Result<T, E>(error, ErrorType);
}
