import React from "react";
import { useField } from "formik";
import Checkbox from "../inputs/Checkbox";

interface FormikCheckboxProps {
  name: string;
  label?: string;
  [key: string]: any;
}

const FormikCheckbox: React.FC<FormikCheckboxProps> = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <Checkbox
      {...field}
      {...props}
      checked={field.value}
      onValueChange={(value) => helpers.setValue(value)}
    />
  );
};

export default FormikCheckbox;
