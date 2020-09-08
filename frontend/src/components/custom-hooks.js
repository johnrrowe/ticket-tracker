import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useFetch = (getData) => {
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      getAccessTokenSilently()
        .then((token) => {
          return getData(token);
        })
        .then((responseData) => {
          if (responseData) {
            setData(responseData);
          }
        });
    })();
  }, []);

  return data;
};

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
