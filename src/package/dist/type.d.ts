export type TKeyValue = { [key: string]: any };

export type TUseForm = (
    values?: TKeyValue,
    validate?: (values: TKeyValue) => TKeyValue
) => {
    commit: (values: object) => void;
    errorMap: TKeyValue;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (callback: (values: object) => void) => (e: React.FormEvent<HTMLFormElement>) => void;
    isDirty: boolean;
    isSubmitting: boolean;
    isValid: boolean;
    rollBack: () => void;
    touchedMap: TKeyValue;
    values: TKeyValue;
};
