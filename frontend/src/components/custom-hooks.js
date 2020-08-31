import { useState, useEffect } from "react";

export const useForm = (submit, initVal, validate) => {
  const [values, setValues] = useState(initVal);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // update values of form elements that have changed
  const handleChange = (event) => {
    const { id, value } = event.target;
    setValues({ ...values, [id]: value });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submit();
    }
  }, [errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };
  return { values, errors, handleChange, handleSubmit };
};
