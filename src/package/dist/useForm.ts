import { useState, useEffect, ErrorInfo } from 'react';

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

const useForm = (initialValues = {}, validate?: any) => {
    const [commitedValues, setCommitedValues] = useState(initialValues);
    const [errorMap, setErrorMap] = useState({});
    const [isDirty, setIsDirty] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [touchedMap, setTouchedMap] = useState({});
    const [values, setValues] = useState(initialValues);

    const calculate = () => {
        const errors = typeof validate === 'function' ? validate(values) : {};
        setErrorMap(errors);
        setIsDirty(JSON.stringify(commitedValues) !== JSON.stringify(values));
        setIsValid(!Object.keys(errors).find((key) => errors[key]));
    };

    useEffect(calculate, [commitedValues, values, validate]);

    /**
     * @param {object} values => key/value pairs
     */
    function commit(values: any) {
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
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = getUsefulEventData(e)!;
        setValue(name, value);
    }
    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        const { name } = getUsefulEventData(e)!;
        setFieldTouched(name);
    }
    /**
     * @param {function} callback => Normal/Async function that will be passed with the "values"
     */
    function handleSubmit(callback: (values: any) => void) {
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
