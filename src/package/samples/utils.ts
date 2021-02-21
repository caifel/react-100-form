import { FIELD_KEYS } from './constants';

export const invalidEmail = (value: any) => {
    const regex = new RegExp(
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    );
    return !regex.test(value as string);
};

export function validate(valueMap: any = {}, errorMap: any = {}) {
    let fieldName: string;

    for (fieldName in valueMap) {
        let errorCode: any | false = false;
        const value: any = valueMap[fieldName];
        
        // Getting error code per field
        switch (fieldName) {
            case FIELD_KEYS.EMAIL: {
                errorCode = (value === '' && 'EMPTY') || (invalidEmail(value) && 'INVALID EMAIL');
                break;
            }
            case FIELD_KEYS.PASSWORD: {
                errorCode = (value === '' && 'EMPTY') || (value.length < 5 && 'TOO SHORT');
                break;
            }
            case FIELD_KEYS.AGREEMENT: {
                errorCode = !value && 'NOT ACCEPTED';
                break;
            }

            default:
                break;
        }
        // Setting in/out error
        if (errorCode) {
            errorMap[fieldName] = errorCode;
        } else if (errorMap.hasOwnProperty(fieldName)) {
            delete errorMap[fieldName];
        }
    }
    return errorMap;
}
