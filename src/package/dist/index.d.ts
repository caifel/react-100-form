import { TKeyValue } from "./type";

declare module 'react-100-form' {
    export function useForm(
        values?: any,
        validate?: (values: object, erroMap: object) => object
    ): {
        commit: (values: object) => void;
        errorMap: TKeyValue;
        handleBlur: React.FocusEventHandler<T>;
        handleChange: React.ChangeEventHandler<T>;
        handleSubmit: (callback: (values: object) => void) => React.FormEventHandler<T>;
        isDirty: boolean;
        isSubmitting: boolean;
        isValid: boolean;
        rollBack: () => void;
        touchedMap: TKeyValue;
        values: TKeyValue;
    };
}
