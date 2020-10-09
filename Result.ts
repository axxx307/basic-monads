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

type Result<T, E> = _Result<T, E>;
function Ok<T, E> (value: T): Result<T, E> {
    return new _Result<T, E>(value, OkType);
}

function Err<T, E> (error: T): Result<T, E> {
    return new _Result<T, E>(error, ErrorType);
}

function test (value: string): Result<string, Error> {
    return value ? Ok<string, Error>(value) : Err<string, Error>('err');
}
