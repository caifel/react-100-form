import {  shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { useForm } from 'react-100-form';

const initialValues = { name: '' };
const Form = () => {
    const { isValid, values } = useForm(initialValues);
    return (
        <form>
            <input name="name" value={values['name']} />
			<button type="submit" disabled={!isValid} >Submit</button>
        </form>
    );
};

describe('react-100-form', () => {
    let cmp: ShallowWrapper;
    beforeAll(() => {
        cmp = shallow(<Form />);
    });
    it('Field value is same as initialValue', () => {
        expect(cmp.find('[name="name"]').at(0).prop('value')).toBe(initialValues.name);
	});
	it('isValid is TRUE when no validate function is provided', () => {
        expect(cmp.find('button').at(0).html().includes('disabled=""')).toBeTruthy();
    });
});
