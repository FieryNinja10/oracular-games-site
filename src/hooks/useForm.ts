import { useState } from "react";
const useForm = (initialValues: any) => {
  const [form, setForm] = useState(initialValues);
  const handleChange = (e: any) => {
    setForm((prevForm: object) => ({
      ...prevForm,
      [e.target.name]: e.target.value
    }));
  };
  const resetForm = () => {
    setForm(initialValues);
  };
  return { form, handleChange, resetForm };
};
export default useForm;
