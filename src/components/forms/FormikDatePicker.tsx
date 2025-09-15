import React from "react";
import { useField } from "formik";
import DatePicker from "../inputs/DatePicker";

interface FormikDatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  containerStyle?: any;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: "date" | "time" | "datetime";
  disabled?: boolean;
}

const FormikDatePicker: React.FC<FormikDatePickerProps> = ({
  name,
  containerStyle,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <DatePicker
      {...field}
      {...props}
      containerStyle={containerStyle}
      error={meta.touched && meta.error ? meta.error : undefined}
      onChange={(value) => helpers.setValue(value)}
    />
  );
};

export default FormikDatePicker;
