const SomeType = 'Some';
const NoneType = 'None';

class _Option<T> {
    private readonly _value: T;
    private readonly _internalType: string;

    constructor (value: T, internalType: string) {
        this._value = value;
        this._internalType = internalType;
    }

    public unwrap (): T {
        if (this._internalType === 'None') {
            throw new Error('Unwrap is of type None');
        }

        return this._value;
    }

    public isSome (): boolean {
        return this._internalType === SomeType;
    }

    public isNone (): boolean {
        return this._internalType === NoneType;
    }

    public equals (value: T): boolean {
        return this._value === value;
    }

    public map<U> (predicate: Function): Option<U[]> {
        return predicate(this._value);
    }

    public mapOr<U> (def: U, predicate: Function): Option<U> | Option<U[]> {
        return this._internalType === NoneType ? def : predicate(this._value);
    }
}

export type Option<T> = _Option<T>;

function _None (): Option<null> {
    return new _Option(null, NoneType);
}

export function Some<T> (value: T): Option<T> {
    return new _Option(value, SomeType);
}

export const None = _None();