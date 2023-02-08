import { useState } from 'react';

const useForm = (e) => {
  const [form, setForm] = useState({});

  const onChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(form);
  return { form, onChange };
};

export default useForm;
