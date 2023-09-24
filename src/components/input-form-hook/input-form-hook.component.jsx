import { useState } from "react";

const useFormHook = (initialState) => {
  const [formFields, setFormFields] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = (initialState) => {
    setFormFields(initialState);
  };

  return { formFields, handleChange, resetFormFields, setFormFields };
};

export default useFormHook;
