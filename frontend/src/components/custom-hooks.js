import { useState } from "react";

export const useForm = (submit, initVal, validate) => {
  const [values, setValues] = useState(initVal);
  const [errors, setErrors] = useState({});

  // update values of form elements that have changed
  const handleChange = (event) => {
    const { id, value } = event.target;
    console.log(id + " = " + value);
    setValues({ ...values, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    submit();
  };
  return { values, errors, handleChange, handleSubmit };
};
