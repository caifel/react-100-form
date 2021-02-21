import { useState, useEffect, ErrorInfo } from 'react';
import { TKeyValue } from './type';

function logError(err: ErrorInfo) {
    console.error('An Event-Object must be passed to handleChange, handleBlur and handleSubmit', [err]);
}

function getUsefulEventData(e: React.ChangeEvent<HTMLInputElement>) {
    try {
        const { type, checked, value } = e.target;
        return {
            name: e.target.name,
            value: type === 'checkbox' ? checked : value,
        };
    } catch (err) {
        logError(err);
    }
}

const useForm = (initialValues: TKeyValue = {}, validate?: (values: TKeyValue) => TKeyValue) => {
    const [commitedValues, setCommitedValues] = useState<TKeyValue>(initialValues);
    const [errorMap, setErrorMap] = useState<TKeyValue>({});
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [touchedMap, setTouchedMap] = useState<TKeyValue>({});
    const [values, setValues] = useState<TKeyValue>(initialValues);

    useEffect(() => {
        const errors = validate ? validate(values) : {};
        setErrorMap(errors);
        setIsDirty(JSON.stringify(commitedValues) !== JSON.stringify(values));
        setIsValid(Object.keys(errors).length === 0);
    }, [commitedValues, values, validate]);

    /**
     * @param {object} values => key/value pairs
     */
    function commit(values: TKeyValue) {
        setCommitedValues(values);
        setValues(values);
        setTouchedMap({});
    }
    // Restores to the last commited point
    function rollBack() {
        commit(commitedValues);
    }
    /**
     * @param {string} name => Represents the field name
     * @param {*} value => Field value
     */
    function setValue(name: string, value: any) {
        setValues({ ...values, [name]: value });
    }
    /**
     * @param {string} name => Represents the field name
     */
    function setFieldTouched(name: string) {
        setTouchedMap({ ...touchedMap, [name]: true });
    }
    /**
     * @param {object} e => Input's event object
     */
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = getUsefulEventData(e)!;
        setValue(name, value);
    }
    /**
     * @param {object} e => Form's event object
     */
    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        const { name } = getUsefulEventData(e)!;
        setFieldTouched(name);
    }
    /**
     * @param {function} callback => Normal/Async function that will be passed with the "values"
     */
    function handleSubmit(callback: (values: TKeyValue) => void) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            try {
                e.preventDefault();
                setIsSubmitting(true);
                await callback(values);
                setIsSubmitting(false);
            } catch (err) {
                logError(err);
            }
        };
    }

    return {
        commit,
        errorMap,
        handleBlur,
        handleChange,
        handleSubmit,
        isDirty,
        isSubmitting,
        isValid,
        rollBack,
        setFieldTouched,
        setValue,
        touchedMap,
        values: Object.freeze(values),
    };
};

export default useForm;
