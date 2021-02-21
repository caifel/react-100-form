# React 100 Form

YES! As the name self explains this is a **100** lines **CUSTOM HOOK**.

YES! It has most features you might need when dealing with form.

* [**See it in action**](https://5cnig.csb.app/ "**See it in action here**")
* [**Look the code - all features**](https://codesandbox.io/s/practical-faraday-5cnig?file=/src/samples/index.tsx:36-43 "Look at the sample code making use of all features") or **Refer to the** `samples` **folder** to get inspired
*  (obviously) It uses **TypeScript**

## Installation

`npm install react-100-form`

or

`yarn add react-100-form`

## Simple Usage

```javascript
const initialValues = {name: ''};
const validate = (values, errorMap) => {
	if (values.name === '')  errorMap.name = 'Required';
	else delete errorMap.name;
	return errorMap;
}
const { values } = useForm(initialValues, validate);
...	...
<input
	id="name"
	name="name"
	onBlur={handleBlur}
	onChange={handleChange}
	type="text"
	value={values["name"]}
/>
```

## All features

```javascript
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
} = useForm(
	initialValues,
	validate
);
```

## Author

Mario Medrano Maldonado <mario.medrano.maldonado@gmail.com>
