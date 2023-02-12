import { useState } from 'react';

const useForm = (e) => {
  const [form, setForm] = useState({});

  const onChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return { form, onChange, setForm };
};

export default useForm;
