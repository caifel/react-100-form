export type TValidate<T> = (values: T) => Partial<T>;

export type TResponse<T> = {
    commit: (values: T) => void;
    errorMap: Partial<T>;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (callback: (values: T) => void) => (e: React.FormEvent<HTMLFormElement>) => void;
    isDirty: boolean;
    isSubmitting: boolean;
    isValid: boolean;
    rollBack: () => void;
    touchedMap: Partial<T>;
    values: T;
};
