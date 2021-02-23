import React from 'react';
import { useForm } from 'react-100-form';

// Needed Form TYPES
type TField = 'name' | 'email' | 'message';
type TFields = { [key in TField]: TField };
type TFieldMap = { [key in TField]: any };

// Needed FORM DEFINITION
const FIELDS: TFields = { name: 'name', email: 'email', message: 'message' };
const validate = (valueMap: TFieldMap) => {
    const errorMap: Partial<TFieldMap> = {};
    errorMap.name = !valueMap.name;
    errorMap.email = !valueMap.email;
    errorMap.message = !valueMap.message;
    return errorMap;
};

const _T = (str: string) => str;

const EasyForm = () => {
    const initialValues: TFieldMap = {
        name: '',
        email: '',
        message: '',
    };
    const { isValid, values, handleBlur, handleChange } = useForm<TFieldMap>(initialValues, validate);

    return (
        <form>
            <input
                autoComplete="off"
                id={FIELDS.name}
                name={FIELDS.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={_T('Your name')}
                value={values[FIELDS.name]}
            />
            <input
                id={FIELDS.email}
                name={FIELDS.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={_T('Your email')}
                value={values[FIELDS.email]}
            />
            <input
                id={FIELDS.message}
                height={112}
                name={FIELDS.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={_T('What is your message?')}
                type="textarea"
                value={values[FIELDS.message]}
            />
            <button disabled={!isValid}>Submit</button>
        </form>
    );
};

export default EasyForm;
