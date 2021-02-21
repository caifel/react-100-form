# 🏁 React 100 Form

YES! As the name says, only **100** lines of code for a powerful **CUSTOM HOOK**.

YES! It has most features you might need when dealing with form.

* [**See it in action**](https://5cnig.csb.app/ "**See it in action here**")
* [**Look the code - all features**](https://codesandbox.io/s/practical-faraday-5cnig?file=/src/samples/index.tsx:36-43 "Look at the sample code making use of all features") or **Refer to the** `samples` **folder** to get inspired
*  (Obviously) It uses **TypeScript**

✅ Zero dependencies (better bundle size)

✅ Only peer dependencies: React

✅ 💥 [**3.4k gzipped**](https://bundlephobia.com/result?p=react-100-form@0.0.7) 💥

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
const doSubmit = (values) => { /*your submit logic*/ };
const { handleSubmit, isValid, values } = useForm(initialValues, validate);
...	...
<form onSubmit={handleSubmit(doSubmit)}>
...	...
<input
	id="name"
	name="name"
	onBlur={handleBlur}
	onChange={handleChange}
	type="text"
	value={values["name"]}
/>
{errorMap.name && <span>{errorMap.name}</span>}
...	...
<button type="submit" disabled={!isValid}>Submit</button>
```

## All features

```javascript
const {
	commit, // Set current values as inital state
	errorMap,
	handleBlur,
	handleChange,
	handleSubmit,
	isDirty,
	isSubmitting,
	isValid,
	rollBack, // Restore to initial state or to last committed state
	touchedMap,
	values,
} = useForm(
	initialValues,
	validate
);
```

## Author

Mario Medrano Maldonado **(Gendecoder)** <mario.medrano.maldonado@gmail.com>
