import React from 'react';
import { useForm } from 'react-100-form';
import * as constants from './constants';
import './styles.css';
import { validate } from './utils';

const { EMAIL, PASSWORD, GENDER, AGREEMENT } = constants.FIELD_KEYS;
const { FEMALE, MALE } = constants.FIELD_VALUES;
const initialValues = { [EMAIL]: '', [PASSWORD]: '', [GENDER]: FEMALE, [AGREEMENT]: false };

const SampleForm = () => {
    const {
        commit,
        errorMap,
        handleBlur,
        handleChange,
        handleSubmit,
        isDirty,
        isSubmitting,
        isValid,
        rollBack,
        touchedMap,
        values,
    } = useForm(initialValues, validate);

    function onSubmit(values: any) {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        }).then(() => {
            commit(values);
            console.log(values);
        });
    }

    return (
        <div className="container">
            <h2>{'Sample Form'}</h2>

            <div>
                <div className="info-container">
                    <div className="info-item">
                        <span>{'Is valid?'}</span>
                        <span>{isValid + ''}</span>
                    </div>

                    <div className="info-item">
                        <span>{'Is dirty?'}</span>
                        <span>{isDirty + ''}</span>
                    </div>

                    <div className="info-item">
                        <span>{'Is Submitting?'}</span>
                        <span>{isSubmitting + ''}</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="action-bar">
                    <button onClick={() => commit(values)} type="button">
                        Commit
                    </button>
                    <button onClick={rollBack} type="button">
                        RollBack
                    </button>
                    <button disabled={!isValid} type="submit">
                        {'Save'}
                    </button>
                </div>

                {/* INPUT FIELD */}

                <div className="field">
                    <label htmlFor={EMAIL}>{`${EMAIL}:`}</label>
                    <input
                        id={EMAIL}
                        name={EMAIL}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values[EMAIL]}
                    />
                    <div className="info-container">
                        <div className="info-item">
                            <span>{'Touched'}</span>
                            <span>{String(!!touchedMap[EMAIL])}</span>
                        </div>

                        <div className="info-item">
                            <span>{'Error'}</span>
                            <span>{String(errorMap[EMAIL] || 'None')}</span>
                        </div>
                    </div>
                </div>

                {/* INPUT FIELD */}

                <div className="field">
                    <label htmlFor={PASSWORD}>{`${PASSWORD}:`}</label>
                    <input
                        id={PASSWORD}
                        name={PASSWORD}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values[PASSWORD]}
                    />
                    <div className="info-container">
                        <div className="info-item">
                            <span>{'Touched'}</span>
                            <span>{String(!!touchedMap[PASSWORD])}</span>
                        </div>

                        <div className="info-item">
                            <span>{'Error'}</span>
                            <span>{String(errorMap[PASSWORD] || 'None')}</span>
                        </div>
                    </div>
                </div>

                {/* RADIO FIELD */}

                <div className="field">
                    <label>{`${GENDER}:`}</label>
                    <div style={{ marginTop: 10 }}>
                        <input
                            checked={MALE === values[GENDER]}
                            id={MALE}
                            name={GENDER}
                            onChange={handleChange}
                            type="radio"
                            value={MALE}
                        />
                        <label htmlFor={MALE} style={{ marginLeft: 5 }}>{'Male'}</label>
                    </div>
                    <div>
                        <input
                            checked={FEMALE === values[GENDER]}
                            id={FEMALE}
                            name={GENDER}
                            onChange={handleChange}
                            type="radio"
                            value={FEMALE}
                        />
                        <label htmlFor={FEMALE} style={{ marginLeft: 5 }}>{'Female'}</label>
                    </div>

                    <div className="info-container">
                        <div className="info-item">
                            <span>{'Error'}</span>
                            <span>{String(errorMap[GENDER] || 'None')}</span>
                        </div>
                    </div>
                </div>

                {/* CHECKBOX FIELD */}

                <div className="field">
                    <label>{`${AGREEMENT}:`}</label>
                    <div style={{ marginTop: 10 }}>
                        <input
                            id={AGREEMENT}
                            name={AGREEMENT}
                            onChange={handleChange}
                            type="checkbox"
                            value={values[AGREEMENT]}
                        />
                        <label htmlFor={AGREEMENT} style={{ marginLeft: 5 }}>{'Do you accept?'}</label>
                    </div>

                    <div className="info-container">
                        <div className="info-item">
                            <span>{'Error'}</span>
                            <span>{String(errorMap[AGREEMENT] || 'None')}</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SampleForm;
